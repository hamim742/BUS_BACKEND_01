import AppError from "../../error/appError";
import { prisma } from "../../lib/prisma";
import httpStatus from "http-status";
import { UserStatus } from "../user/user.constain";
import { IJwtPayload } from "../../interface/IJwtPayload";
import { createJwtToken } from "../../utils/createToken";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { sendEmail } from "../../utils/sendEmail";
import bcrypt from "bcryptjs";

interface LoginPayload {
    email: string;
    password: string;
}
const verifyEmail = async (email: string,otp: string): Promise<boolean|undefined> => {
const user =await prisma.user.findFirst({
    where:{
        email 
    }
})
if(user?.twoFactorOTP !== otp){
    throw new AppError(httpStatus.BAD_REQUEST,'Invalid OTP provided!');
}

if(user?.twoFactorOTPExpires && user.twoFactorOTPExpires < new Date()){
    throw new AppError(httpStatus.BAD_REQUEST,'OTP has expired. Please request a new one.');
}

await prisma.user.update({
    where:{
        email   
    },
    data:{
       isEmailVerified:true,
       twoFactorOTP:null,
       twoFactorOTPExpires:null,
    }
})
return true;
}


const loginUser=async(payload:LoginPayload)=>{

const user=await prisma.user.findUnique({
    where:{
        email:payload.email
    }
})

if(!user){
    throw new AppError(httpStatus.NOT_FOUND,'User not found with the provided email!');
}

// if(!user.isEmailVerified){
//     throw new AppError(httpStatus.UNAUTHORIZED,'Email not verified. Please verify your email before logging in.');
// }

if(!user.password){
    throw new AppError(httpStatus.UNAUTHORIZED,'User registered with social login. Please use the respective social login method.');
}

const isCorrectPassword=await bcrypt.compare(payload.password,user.password);   
if(!isCorrectPassword){
    throw new AppError(httpStatus.UNAUTHORIZED,'Incorrect password provided!');
}

const accessToken= await createJwtToken({
    userId:user.id,
    email:user.email,
    role:user.role,
    name:user.name
},config.jwt.access_secret as Secret,config.jwt.access_expires_in as string)

return accessToken
}


const forgetPassword = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND,'User not found');
  }

  if (
    user.status === UserStatus.INACTIVE 
  ) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE,`User is ${user.status}`);
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };

  const token = createJwtToken(
    jwtPayload as IJwtPayload ,
    config.jwt.access_secret as Secret,
    config.jwt.access_expires_in as string
  );

  const resetUrl = `${config.client_url}/reset-password?token=${token}&id=${user.id}`;
  sendEmail({
    to: user.email,
    subject: 'Reset Password',
    templateName: 'forgetPassword',
    templateData: {
      name: 'Hamim',
      resetUrl,
    },
  });
};


export const authServices={
    verifyEmail,
    loginUser,
    forgetPassword
}
