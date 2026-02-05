import { Router } from "express";
import { authController } from "./auth.controller";

const router=Router();

router.post('/verify-email', authController.verifyEmail);
router.post('/login', authController.loginUser);

router.post('/forget-password', authController.forgetPassword);

export const authRoutes=router;