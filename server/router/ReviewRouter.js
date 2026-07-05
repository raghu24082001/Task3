import express from "express";
import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "../controller/ReviewControl.js";

const ReviewRouter = express.Router();

// POST /api/reviews — Create a new review
ReviewRouter.post("/", createReview);

// GET /api/reviews — Get all reviews
ReviewRouter.get("/", getAllReviews);

ReviewRouter.get("/:id", getReviewById);

ReviewRouter.put("/:id", updateReview);

ReviewRouter.delete("/:id", deleteReview);

export default ReviewRouter;
