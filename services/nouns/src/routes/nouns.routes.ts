import express, { Router } from "express";
import nounsController from "../controllers/nouns.controller";
import { body } from "express-validator";

const router: Router = express.Router();

router.get("/random", nounsController.getRandom.bind(nounsController));

router.post(
  "/noun",
  body("noun")
    .isString()
    .bail()
    .isLength({ max: 30, min: 1 })
    .bail()
    .notEmpty()
    .bail()
    .exists(),
  nounsController.postNoun.bind(nounsController)
);

export default router;
