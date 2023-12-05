import express from "express";
import {
  allUsers,
  loginController,
  registerController,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/login").post(loginController);
//register user
router.route("/register").post(registerController);

router.route("/").get(protect, allUsers);

export default router;
