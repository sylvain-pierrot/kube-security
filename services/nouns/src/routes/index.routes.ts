import express, { Router, Request, Response } from "express";
import pkg from "../../package.json";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ version: pkg.version, name: pkg.name });
});

router.get("/healthz", (req: Request, res: Response) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
  };

  res.status(200).send(data);
});

export default router;
