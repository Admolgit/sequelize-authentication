const db = require("../models");

// Create main model
const Review = db.reviews;

module.exports.addReview = async (req, res) => {
  try {
    const { rating, description } = req.body;

    if (!rating || !description) {
      throw new error("All fields must be filled");
    }

    const review = await Review.create({
      rating: rating,
      description: description,
    });

    res.status(201).json({
      message: "Review created successfully",
      review: review,
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.getAllReviews = async (req, res) => {
  try {
    const allReviews = await Review.findAll({});

    if (!allReviews) {
      res.status(404).json({
        message: "Reviews not found",
      });
    } else {
      res.status(201).json({
        message: "Review fetched successfully",
        review: allReviews,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.deleteReview = async (req, res) => {
  try {
    const product = await Review.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Review of ${product} was deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.updateReview = async (req, res) => {
  const { rating, description } = req.body;
  try {
    const product = await Review.update(
      {
        rating: rating,
        description: description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (product == 0) {
      return res.status(404).json({
        message: `This product does not exist`,
      });
    }

    res.status(200).json({
      message: `Review of ${req.params.id} was updated successfully`,
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

