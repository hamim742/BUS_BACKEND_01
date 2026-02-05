import { Request, Response } from "express";
import catchAsyncFn from "../../utils/catchAsyncFn";
import sendResponse from "../../utils/sendResponse";
import { busServices } from "./bus.services";
import httpStatus from "http-status";


const createBusSeat=catchAsyncFn(async(req:Request,res:Response)=>{
    const {seatNumber}=req.body;
    console.log(req.body)
    const busSeat=await busServices.createBusSeat(req.body);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:"Bus seat created successfully",
        data:busSeat
    })
})

const getAllBusSeat=catchAsyncFn(async(req:Request,res:Response)=>{
    const busSeat=await busServices.getAllBusSeat();

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Bus seat retrieved successfully",
        data:busSeat
    })
})


export const busController={
    createBusSeat,
    getAllBusSeat
}