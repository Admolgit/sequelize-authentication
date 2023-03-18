const express = require("express");
const { addReview, getAllReviews } = require("../controllers/reviewController");

const reviewsRouter = express.Router();

reviewsRouter.post('/addreview', addReview);
reviewsRouter.get('/allreviews', getAllReviews);

module.exports = reviewsRouter;