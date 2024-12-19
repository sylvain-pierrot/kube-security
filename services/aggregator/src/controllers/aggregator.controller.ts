import { Request, Response } from "express";

class AggregatorController {
  async getRandom(req: Request, res: Response) {
    try {
      const [verbResponse, nounResponse] = await Promise.all([
        fetch(`${process.env.SERVICE_VERBS_URL}/api/random`),
        fetch(`${process.env.SERVICE_NOUNS_URL}/api/random`),
      ]);

      if (!verbResponse.ok || !nounResponse.ok) {
        throw new Error(
          `Failed to fetch: verb service (${verbResponse.status}) and noun service (${nounResponse.status})`
        );
      }

      const [verb, noun] = await Promise.all([
        verbResponse.json(),
        nounResponse.json(),
      ]);

      res.json({ verb: verb.verb, noun: noun.noun });
    } catch (error) {
      console.error("Error fetching random verb:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new AggregatorController();
