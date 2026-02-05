import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { busRoutes } from "../modules/bus/bus.routes";
import { adminRoutes } from "../modules/admin/admin.routes";

const router=Router();

const moduleRoutes=[
    {
        path:'/users',
        route:userRoutes
    },
    {
        path:'/auth',
        route:authRoutes
    },
    {
        path:'/bus',
        route:busRoutes
    },
    {
        path:'/admin',
        route:adminRoutes
    }
]

moduleRoutes.forEach((route)=>{
    router.use(route.path,route.route);
});

export default router;