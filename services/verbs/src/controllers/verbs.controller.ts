import { Request, Response } from "express";
import { validationResult } from "express-validator";

const verbs = [
  "run",
  "jump",
  "write",
  "sing",
  "read",
  "dance",
  "speak",
  "drive",
  "cook",
  "swim",
  "walk",
  "fly",
  "climb",
  "paint",
  "laugh",
];

class VerbsController {
  getRandom(req: Request, res: Response) {
    const noun = verbs[Math.floor(Math.random() * verbs.length)];
    res.json({ noun });
  }

  getAll(req: Request, res: Response) {
    res.json({ verbs });
  }

  postVerb(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { verb } = req.body;
    verbs.push(verb);

    res.json({ verb });
  }
}

export default new VerbsController();
