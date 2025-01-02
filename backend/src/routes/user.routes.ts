import express from "express";
import {registerUser} from "../controllers/user.controller";
import { userRegisterValidation } from "../validators/user.validators";
const router = express.Router();

router.post("/register", userRegisterValidation, registerUser);

export default router;
