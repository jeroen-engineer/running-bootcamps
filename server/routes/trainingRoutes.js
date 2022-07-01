import express from "express";
const router = express.Router();
import {
  getTrainings,
  getTrainingById,
  deleteTraining,
  createTraining,
  updateTraining,
  reserveSpotInTraining,
} from "../controllers/trainingController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getTrainings).post(protect, admin, createTraining);
router.route("/:id/reserve-spot").post(protect, reserveSpotInTraining);
router
  .route("/:id")
  .get(getTrainingById)
  .delete(protect, admin, deleteTraining)
  .put(protect, admin, updateTraining);

export default router;
