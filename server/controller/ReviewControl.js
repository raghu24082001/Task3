import Review from "../modal/ReviewModal.js";

// POST /api/reviews — Create a new review
export const createReview = async (req, res) => {
  try {
    const { name, company, message, rating } = req.body;

    if (!name || !message || !rating) {
      return res.status(400).json({ message: "Name, message, and rating are required." });
    }

    const review = new Review({ name, company, message, rating });
    const saved = await review.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/reviews — Get all reviews (newest first)
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/reviews/:id — Get single review
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT /api/reviews/:id — Update a review
export const updateReview = async (req, res) => {
  try {
    const { name, company, message, rating } = req.body;

    const updated = await Review.findByIdAndUpdate(
      req.params.id,
      { name, company, message, rating },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE /api/reviews/:id — Delete a review
export const deleteReview = async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
