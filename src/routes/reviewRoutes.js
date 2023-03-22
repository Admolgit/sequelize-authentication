const express = require("express");
const { addReview, getAllReviews, deleteReview, updateReview } = require("../controllers/reviewController");

const reviewsRouter = express.Router();

reviewsRouter.post('/addreview', addReview);
reviewsRouter.get('/allreviews', getAllReviews);
reviewsRouter.delete('/review/:id', deleteReview);
reviewsRouter.put('/review/:id', updateReview);

module.exports = reviewsRouter;