import express from "express";
import {
  loginUser,
  registerUser,
  updateUserprofile,
  logoutUser,
  forgotPassword,
  resetPassword,
  getBucketItems,
  saveBucketItems,
} from "../controllers/userController.js";
const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/update").put(updateUserprofile);
router.route("/logout").get(logoutUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:resetToken").patch(resetPassword);
router.route("/bucketItems").get(getBucketItems).post(saveBucketItems); // Added this line

export default router;
