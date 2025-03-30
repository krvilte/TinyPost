import { Router } from "express";
import {
  GetAllThoughtPosts,
  WriteThoughtPost,
  UpdateThoughtPost,
  DeleteThoughtPost,
} from "../controllers/thoughts.controllers.js";

const router = Router();

// app.use(verifyToken);
router.route("/").get(GetAllThoughtPosts).post(WriteThoughtPost);
router.route("/:id").put(UpdateThoughtPost).delete(DeleteThoughtPost);

export default router;
