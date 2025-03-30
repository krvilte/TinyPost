import { User } from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

// @desc Register User
// @route POST "/api/v1/users/register"
// @access public
export const RegisterUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;
  if (!fullName || !username || !email || !password)
    throw new ApiError(400, "All fields are required");

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser)
    throw new ApiError(409, "User with the email or username already exists.");

  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
  });

  const responseData = await User.findById(user._id).select("-password");

  res
    .status(201)
    .json(new ApiResponse(201, "User registeration successful", responseData));
});

// @desc Login User
// @route POST "/api/v1/users/login"
// @access public
export const LoginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!email && !username)
    throw new ApiError(400, "Email or username is required");
  if (!password) throw new ApiError(400, "Password is requried");

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (!existingUser) throw new ApiError(404, "User not found");

  const validPassword = await existingUser.isCorrectPassword(password);
  if (!validPassword) throw new ApiError(401, "Incorrect password");

  const accessToken = await existingUser.generateAccessToken();

  const userData = {
    id: existingUser._id,
    username: existingUser.username,
    email: existingUser.email,
    accessToken,
  };

  res.status(200).json(new ApiResponse(200, "Login successful", userData));
});

// @desc Logout User
// @route POST "/api/v1/users/logout"
// @access private
export const LogoutUser = asyncHandler(async (req, res) => {
  if (req.cookies?.accessToken) {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
    });
  }

  res.status(200).json(new ApiResponse(200, "Logged out successfully"));
});

// @desc Current user info
// @route POST /api/v1/users/current
// @access private

export const CurrentUser = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.id)
    throw new ApiError(401, "Unauthorized request");

  const user = await User.findById(req.user.id).select("-password");
  if (!user) throw new ApiError(401, "User not found");

  res.status(200).json(new ApiResponse(200, "Current user", user));
});
