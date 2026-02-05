import { Request, Response } from "express";
import catchAsyncFn from "../../utils/catchAsyncFn";
import { userRegisterService } from "./user.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const registerUserIntoDB=catchAsyncFn(async (req:Request, res:Response) => {
 const user=await userRegisterService.registerUserIntoDB(req.body);

 sendResponse(res,{
    statusCode: httpStatus.OK,
    message: user.message,
    data: user.user,
 })
});


export const userController={
    registerUserIntoDB,
}