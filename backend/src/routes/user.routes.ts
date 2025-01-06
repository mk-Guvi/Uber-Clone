import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} from "../controllers/user.controller";
import {
  userRegisterValidation,
  
} from "../validators/user.validators";
import { authUser } from "../middlewares/auth.middleware";
import { userLoginValidation } from "../validators/common.validators";
const router = express.Router();

router.post("/register", userRegisterValidation, registerUser);
router.post("/login", userLoginValidation, loginUser);
router.get("/profile", authUser, getUserProfile);
router.get("/logout", authUser, logoutUser);

export default router;
