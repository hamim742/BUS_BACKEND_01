import config from "../../../config";
import { prisma } from "../../lib/prisma";
import { UserRoleEnum } from "../user/user.constain";
import bcrypt from 'bcryptjs'
const createAdmin = async (name: string, email: string, password: string) => {
    console.log(name, email, password);
    const hashedPass=await bcrypt.hash(password,config.super_admin.salt)
    const result = await prisma.user.create({
        data: {
            name,
            email,
            password:hashedPass,
            role: UserRoleEnum.ADMIN,
        },
    });
    return result;
};


export const adminServices = {
    createAdmin
}