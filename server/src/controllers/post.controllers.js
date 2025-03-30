import asyncHandler from "express-async-handler";
import Post from "../models/post.model.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

// @desc Get posts
// route /api/v1/tiny-posts
// access private
export const GetAllTinyPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});
  if (!posts) throw new ApiError(404, "Posts not found");

  res.status(200).json(new ApiResponse(200, "Success", posts));
});

// @desc Create post
// route /api/v1/tiny-posts
// access private
export const CreateTinyPost = asyncHandler(async (req, res) => {
  const { title, content, mood, tags } = req.body;

  if (!title) throw new ApiError(400, "Title is required");
  if (!content) throw new ApiError(400, "Content is required");
  if (title.length > 50)
    throw new ApiError(400, "Title should not exceed 50 chatacters.");
  if (content.length > 1000)
    throw new ApiError(400, "Content should not exceed 1000 chatacters.");

  const postData = await Post.create({
    userId: req.user.id,
    title,
    content,
    mood,
    tags,
  });

  res.status(201).json(new ApiResponse(200, "Success", postData));
});

// @desc Update post
// route /api/v1/tiny-posts/:id
// access private
export const UpdateTinyPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, mood, tags } = req.body;

  if (!title && !content && !mood && !tags) {
    throw new ApiError(400, "At least one field must be provided for update.");
  }

  const post = await Post.findById(id);
  if (!post) {
    throw new ApiError(404, "Post not found.");
  }

  // Verify ownership
  if (post.userId.toString() !== req.user.id) {
    throw new ApiError(403, "You are not authorized to update this post.");
  }

  // Update fields only if they are provided in the request body
  if (title && title.length <= 50) {
    post.title = title;
  }
  if (content && content.length <= 1000) {
    post.content = content;
  }
  if (mood) {
    post.mood = mood;
  }
  if (tags) {
    post.tags = tags;
  }

  const updatedPost = await post.save();

  res
    .status(200)
    .json(new ApiResponse(200, "Post Updated successfully", updatedPost));
});

// @desc Update post
// route /api/v1/tiny-posts/:id
// access private
export const DeleteTinyPost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.userId.toString() !== req.user.id) {
    throw new ApiError(403, "Not authorized to delete this post");
  }

  await post.deleteOne();

  res.status(200).json(new ApiResponse(200, "Post deleted successfully"));
});
