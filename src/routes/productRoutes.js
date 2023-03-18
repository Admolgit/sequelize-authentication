const express = require("express");
const authGuard = require("../Authourization/auth");
const { createProduct, getProducts, getProductById, deleteProduct, updateProduct, getProductReviews } = require("../controllers/productController");

const productRouter = express.Router();

productRouter.post("/create-product", createProduct);
productRouter.get("/products", getProducts);
productRouter.get("/product/:id", getProductById);
productRouter.delete("/product/:id", deleteProduct);
productRouter.put("/product/:id", updateProduct);

productRouter.get("/product_reviews/:id", getProductReviews)

module.exports = productRouter;
