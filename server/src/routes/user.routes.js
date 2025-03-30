import { Router } from "express";
import {
  RegisterUser,
  LoginUser,
  LogoutUser,
  CurrentUser,
} from "../controllers/user.controllers.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

//User Routes
router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);
router.route("/logout").post(verifyToken, LogoutUser);
router.route("/current").get(verifyToken, CurrentUser);

export default router;
