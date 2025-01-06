import express from 'express';
import { captainRegisterValidation } from '../validators/captain.validators';
import { registerCaptain } from '../controllers/captain.controller';
const router=express.Router();

router.post('/register',captainRegisterValidation,registerCaptain)


export default router;