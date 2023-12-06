import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendRes";
import { FacultyService } from "./faculty.service";

const createFaculty = catchAsync(async (req, res) =>{
    const newFaculty = req.body

    const result = await FacultyService.createFacultyInDB(newFaculty)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculty Created succesfully",
        data: result
    })
})



const AllFaculty = catchAsync(async (req, res)=>{
    const result = await FacultyService.getAllFacultyFromDB()
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: `${result.length} faculty found`,
        data: result
    })
})


const SingleFaculty = catchAsync(async (req, res)=>{
    const result = await FacultyService.getOneFacultyFromDB(req.params.id)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: `faculty found`,
        data: result
    })
})


const UpdateAFaculty = catchAsync(async (req, res) =>{
    const updatedFaculty = req.body;
    const result = await FacultyService.UpdateFacultyFromDB(req.params.id, updatedFaculty)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: `faculty updated`,
        data: result
    })
})
export const FacultyController = {
    createFaculty,
    AllFaculty,
    SingleFaculty,
    UpdateAFaculty
}