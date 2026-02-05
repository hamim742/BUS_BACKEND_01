import { Request, Response } from "express";
import catchAsyncFn from "../../utils/catchAsyncFn";
import { authServices } from "./auth.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
const verifyEmail=catchAsyncFn(async (req:Request,res:Response)=>{
    const {email,otp}=req.body
const verification=await authServices.verifyEmail(email,otp);

sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"Email verified successfully",
    data:verification
})
})


const loginUser=catchAsyncFn(async(req:Request,res:Response)=>{
    const payload=req.body;
    const result=await authServices.loginUser(payload);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"User logged in successfully",
        data:result
    })
})


const forgetPassword=catchAsyncFn(async(req:Request,res:Response)=>{
    const {email}=req.body;
    const result=await authServices.forgetPassword(email);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Verification OTP sent to your email. Please verify to activate account.",
        data:result
    })
})

export const authController={
    verifyEmail,
    loginUser,
    forgetPassword
}
