import { Category } from "../models/ProductsModel.js";
import asyncHandler from "express-async-handler";


const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).populate("subcategories");
  res.json(categories);
});

const getCategoriesbyId = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id).populate(
    "subcategories"
  );
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  } else {
    res.json(category);
  }
});

export { getCategories, getCategoriesbyId };