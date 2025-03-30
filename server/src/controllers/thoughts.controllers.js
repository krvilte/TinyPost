import asyncHandler from "express-async-handler";
import Thoughts from "../models/thoughts.model.js";
import ApiResponse from "../utils/apiResponse.js";

// @desc Create thought
// route /api/v1/thoughts
// access private

export const GetAllThoughtPosts = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, "Thoughts"));
});

export const WriteThoughtPost = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, "Create thought post"));
});

export const UpdateThoughtPost = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, "Update thought post"));
});

export const DeleteThoughtPost = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, "Delete thought post"));
});
