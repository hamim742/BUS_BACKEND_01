import { Router } from "express";
import { userController } from "./user.controller";

const router=Router();

router.post('/register',userController.registerUserIntoDB);

export const userRoutes=router;