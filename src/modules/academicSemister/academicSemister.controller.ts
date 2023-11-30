import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendRes";
import { AcademicSemisterService } from "./academicSemister.service";

const createAcademicSemister = catchAsync(async (req, res) =>{
    const newAcamedicSemister = req.body

    const result = await AcademicSemisterService.CreateSemisterInDB(newAcamedicSemister)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Semister Created succesfully",
        data: result
    })
})



const AllAcademicSemisters = catchAsync(async (req, res)=>{
    const result = await AcademicSemisterService.AllAcademicSemistersFromDB()
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: `${result.length} semister found`,
        data: result
    })
})


const SingleAcademicSemisters = catchAsync(async (req, res)=>{
    const result = await AcademicSemisterService.SingleAcademicSemistersFromDB(req.params.id)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: `semister found`,
        data: result
    })
})


const UpdateASemister = catchAsync(async (req, res) =>{
    const updatedSemister = req.body;
    const result = await AcademicSemisterService.UpdateASemisterFromDB(req.params.id, updatedSemister)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: `semister updated`,
        data: result
    })
})
export const AcademicSemisterController = {
    createAcademicSemister,
    AllAcademicSemisters,
    SingleAcademicSemisters,
    UpdateASemister
}