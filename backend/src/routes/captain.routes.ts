import express from 'express';
import { captainRegisterValidation } from '../validators/captain.validators';
import { loginCaptain, registerCaptain,getCaptainProfile,logoutCaptain } from '../controllers/captain.controller';
import { userLoginValidation } from '../validators/common.validators';
import { authCaptain } from '../middlewares/auth.middleware';
const router=express.Router();

router.post('/register',captainRegisterValidation,registerCaptain)
router.post('/login',userLoginValidation,loginCaptain)
router.get("/profile", authCaptain, getCaptainProfile);
router.get("/logout", authCaptain, logoutCaptain);

export default router;