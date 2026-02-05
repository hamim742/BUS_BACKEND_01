import { UserRoleEnum } from "../../../generated/prisma/enums";
import config from "../../config";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

export const seedSuperAdmin=async()=>{
    const isSuperAdminExists = await prisma.user.findFirst({
        where: {
            role: UserRoleEnum.SUPER_ADMIN,
            email: config.super_admin.email
        },
    });
    
    if (!isSuperAdminExists) {

        const hashedPass=await bcrypt.hash(config.super_admin.password,config.super_admin.salt)
        const superAdmin = await prisma.user.create({
            data: {
                name: 'Super Admin',
                email: config.super_admin.email,
                password:hashedPass,
                role: UserRoleEnum.SUPER_ADMIN,
            },
        });

        console.log('Super Admin created successfully.', superAdmin);
    }   
}