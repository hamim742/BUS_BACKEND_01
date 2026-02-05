import { Request, Response } from "express";
import catchAsyncFn from "../../utils/catchAsyncFn";
import { adminServices } from "./admin.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createAdmin = catchAsyncFn(async (req:Request, res:Response) => {
    const { name, email, password } = req.body;

    const result = await adminServices.createAdmin(name, email, password);
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Admin created successfully",
        data: result,
    });
});


export const adminController = {
    createAdmin,
};