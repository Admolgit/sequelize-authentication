const db = require("../models");

// Create main model
const Review = db.reviews;

module.exports.addReview = async (req, res) => {
  try {
    const { rating, description } = req.body;

    if(!rating || !description) {
      throw new error("All fields must be filled")
    }

    const review = await Review.create({
      rating: rating,
      description: description
    });

    res.status(201).json({
      message: "Review created successfully",
      review: review,
    })
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong", 
      error: error.message 
    });
  }
};

module.exports.getAllReviews = async (req, res) => {
  try {
    const allReviews = await Review.findAll({});

    if(!allReviews) {
      res.status(404).json({
        message: "Reviews not found",
      });
    } else {
      res.status(201).json({
        message: "Review fetched successfully",
        review: allReviews,
      })
    }
    
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong", 
      error: error.message 
    });
  }
}