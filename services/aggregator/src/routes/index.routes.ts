import express, { Router, Request, Response } from "express";
import pkg from "../../package.json";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ version: pkg.version });
});

router.get("/healthz", async (req: Request, res: Response) => {
  try {
    const [verbResponse, nounResponse] = await Promise.all([
      fetch(`${process.env.SERVICE_VERBS_URL}/healthz`),
      fetch(`${process.env.SERVICE_NOUNS_URL}/healthz`),
    ]);

    if (!verbResponse.ok || !nounResponse.ok) {
      const errors = [
        !verbResponse.ok && `verb service (${verbResponse.status})`,
        !nounResponse.ok && `noun service (${nounResponse.status})`,
      ]
        .filter(Boolean)
        .join(" and ");
      throw new Error(`Failed to get healthz: ${errors}`);
    }

    res.status(200).json({
      status: "alive",
      uptime: process.uptime(),
      date: new Date(),
    });
  } catch (error) {
    console.error("Error in /healthz endpoint:", error);
    res.status(500).json({
      status: "not alive",
      uptime: process.uptime(),
      date: new Date(),
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

export default router;
