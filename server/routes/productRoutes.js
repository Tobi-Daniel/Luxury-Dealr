import express from "express";
import {
  getCategories,
  getCategoriesbyId,
} from "../controllers/categoriesController.js";
import {
  getProductById,
  getProducts,
  getProductsByCategory,
  getProductsBySubcategory,
} from "../controllers/productsController.js";
import {
  getSubcategories,
  getSubcategoryById,
} from "../controllers/subcategoriesController.js";

const router = express.Router();

router.route("/categories").get(getCategories);

router.route("/categories/:id").get(getCategoriesbyId);

router.route("/subcategories").get(getSubcategories);

router.route("/subcategories/:id").get(getSubcategoryById);

router.route("/products").get(getProducts);

router.route("/products/:id").get(getProductById);

router.route("/products/category/:categoryName").get(getProductsByCategory);

router
  .route("/products/subcategory/:subcategoryName")
  .get(getProductsBySubcategory);

export default router;
