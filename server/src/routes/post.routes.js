import { Router } from "express";
import {
  GetAllTinyPosts,
  CreateTinyPost,
  UpdateTinyPost,
  DeleteTinyPost,
} from "../controllers/post.controllers.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/")
  .get(verifyToken, GetAllTinyPosts)
  .post(verifyToken, CreateTinyPost);
router
  .route("/:id")
  .put(verifyToken, UpdateTinyPost)
  .delete(verifyToken, DeleteTinyPost);

export default router;
