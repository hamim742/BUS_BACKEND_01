import { Router } from "express";
import checkAuth from "../../middleware/checkAuth";
import { UserRoleEnum } from "../user/user.constain";
import { adminController } from "./admin.controller";

const router = Router();

router.post('/register',checkAuth(UserRoleEnum.SUPERADMIN),adminController.createAdmin);

export const adminRoutes = router;