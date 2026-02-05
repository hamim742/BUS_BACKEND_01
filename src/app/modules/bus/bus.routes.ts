import { Router } from "express";
import { busController } from "./bus.controller";
import checkAuth from "../../middleware/checkAuth";
import { UserRoleEnum } from "../user/user.constain";
// import { validateRequest } from "../../middleware/validateRequest";
// import { busZodSchema } from "./bus.zod.schema";

const router=Router();

router.post('/create-seat',checkAuth(UserRoleEnum.ADMIN),busController.createBusSeat)
router.get('/all-seat',checkAuth(UserRoleEnum.USER),busController.getAllBusSeat)
export const busRoutes=router;