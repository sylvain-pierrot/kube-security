import { Request, Response } from "express";
import { validationResult } from "express-validator";

const nouns = [
  "dog",
  "cat",
  "house",
  "car",
  "tree",
  "book",
  "computer",
  "phone",
  "flower",
  "mountain",
  "river",
  "city",
  "ocean",
  "bird",
  "table",
];

class NounsController {
  getRandom(req: Request, res: Response) {
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    res.json({ noun });
  }

  getAll(req: Request, res: Response) {
    res.json({ nouns });
  }

  postNoun(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { noun } = req.body;
    nouns.push(noun);

    res.json({ noun });
  }
}

export default new NounsController();
