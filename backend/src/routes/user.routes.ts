import express from "express";
import {registerUser,loginUser} from "../controllers/user.controller";
import { userRegisterValidation ,userLoginValidation} from "../validators/user.validators";
const router = express.Router();

router.post("/register", userRegisterValidation, registerUser);
router.post("/login",userLoginValidation,loginUser)

export default router;
