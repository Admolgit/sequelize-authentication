const db = require('../models');

// Create main model
const Product = db.products;
const Review = db.reviews;

// Create product
const createProduct = async (req, res) => {
  let { title, price, description, published } = req.body
  try {
    if(!title || !price || !description || !published) throw new error('All fields must be filled');

    const product = await Product.create(req.body)

    res.status(201).json({
      message: 'Product successfully created',
      product: product
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

module.exports = createProduct;