import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  generateToken(res, user._id);

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password!");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) { 
    res.status(400)
    throw new Error("User already exists!");
  }

  const user = await User.create({username, email, password});
  
  if (user) {
    generateToken(res, user._id)
    res.status(201)
    res.json({
      _id: user._id,
      name: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid User Credentials!");
  }
});

export { loginUser, registerUser };
