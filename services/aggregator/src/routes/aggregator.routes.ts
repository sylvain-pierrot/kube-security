import express, { Router } from "express";
import aggregatorController from "../controllers/aggregator.controller";

const router: Router = express.Router();

router.get(
  "/random",
  aggregatorController.getRandom.bind(aggregatorController)
);

export default router;
