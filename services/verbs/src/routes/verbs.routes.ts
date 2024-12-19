import express, { Router } from "express";
import verbsController from "../controllers/verbs.controller";
import { body } from "express-validator";

const router: Router = express.Router();

router.get("/random", verbsController.getRandom.bind(verbsController));

router.post(
  "/verb",
  body("verb")
    .isString()
    .bail()
    .isLength({ max: 30, min: 1 })
    .bail()
    .notEmpty()
    .bail()
    .exists(),
  verbsController.postVerb.bind(verbsController)
);

export default router;
