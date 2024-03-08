import express from "express";
import {
  loginUser,
  registerUser,
  updateUserprofile,
  logoutUser,
} from "../controllers/userController.js";
const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/update").put(updateUserprofile);
router.route("/logout").get(logoutUser);

export default router;