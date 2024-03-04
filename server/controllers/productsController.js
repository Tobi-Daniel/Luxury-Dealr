import { Subcategory, Product } from "../models/ProductsModel.js";
import asyncHandler from "express-async-handler";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (!products) {
    res.status(404);
    throw new Error("No products found");
  } else {
    res.json(products);
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    res.json(product);
  }
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: req.params.categoryName });
  if (!products) {
    res.status(404);
    throw new Error("No products found in this category");
  } else {
    res.json(products);
  }
});

const getProductsBySubcategory = asyncHandler(async (req, res) => {
  const subcategory = await Subcategory.findOne({
    name: req.params.subcategoryName,
  });
  if (!subcategory) {
    res.status(404);
    throw new Error("Subcategory not found");
  }
  const products = await Product.find({ subcategory: subcategory._id });
  if (!products) {
    res.status(404);
    throw new Error("No products found in this subcategory");
  } else {
    res.json(products);
  }
});

export {
  getProducts,
  getProductById,
  getProductsByCategory,
  getProductsBySubcategory,
};
