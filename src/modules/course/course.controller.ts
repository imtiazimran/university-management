import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendRes";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) =>{
 
    const result = await CourseServices.createCourseIntoDB(req.body)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Course Created succesfully",
        data: result
    })
})



const AllCourse = catchAsync(async (req, res)=>{
    const result = await CourseServices.getAllCourseFromDB(req.params)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: `${result.length} course found`,
        data: result
    })
})


const SingleCourse = catchAsync(async (req, res)=>{
    const result = await CourseServices.getSingleCourseFromDB(req.params.id)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: `course found`,
        data: result
    })
})


const DeleteCourse = catchAsync(async (req, res) =>{
    const result = await CourseServices.deleteCourseFromDB(req.params.id)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: `course updated`,
        data: result
    })
})


const UpdateACourse = catchAsync(async (req, res) =>{
    const result = await CourseServices.UpdateCourseIntoDB(req.params.id, req.body)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: `course updated`,
        data: result
    })
})


export const CourseController = {
    createCourse,
    AllCourse,
    SingleCourse,
    UpdateACourse,
    DeleteCourse
}