import mongoose, { Schema } from "mongoose";

const RatingSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: Number,
  review: String,
});

const ProductSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: String,
    description: String,
    images: [String],
    inStock: Boolean,
    brand: {
      type: String,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
    categoryName: {
      type: String,
      required: true,
    },
    subcategoryName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    ratings: [RatingSchema],
  },
  { timestamps: true }
);

const ItemSchema = new Schema(
  {
    name: String,
  },
  { timestamps: true }
);

const SubcategorySchema = new Schema(
  {
    name: String,
    items: [ItemSchema],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

const CategorySchema = new Schema(
  {
    name: String,
    subcategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
    ],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);
const Subcategory = mongoose.model("Subcategory", SubcategorySchema);
const Product = mongoose.model("Product", ProductSchema);
const Item = mongoose.model("Item", ItemSchema);

export { Category, Subcategory, Product, Item }; // Export both Category and Product models
