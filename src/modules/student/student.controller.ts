/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { StudentServices } from "./student.service";
import sendResponse from "../utils/sendRes";
import httpStatus from "http-status";
import catchAsync  from "../utils/catchAsync";




// get all student
const getAllStudens = catchAsync(async (req, res) => {
    const result = await StudentServices.getAllStudensFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Stuent fetched successfully",
        data: result
    })
})



// get single student
const getSingleStudent = catchAsync(async (req, res) => {
    
        const { id } = req.params
        const result = await StudentServices.getOneStudentFromDB(id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Stuent fetched successfully",
            data: result
        })
})


// delete a student 
const deleteOneStudent = catchAsync( async (req, res) => {
           const { id } = req.params
        const result = await StudentServices.deleteOneStudentFromDB(id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Stuent fetched successfully",
            data: result
        })
})


export const StudentController = {
    getAllStudens,
    getSingleStudent,
    deleteOneStudent
}
