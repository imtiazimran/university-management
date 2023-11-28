/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../utils/sendRes";
import httpStatus from "http-status";

// get all student
const getAllStudens = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await StudentServices.getAllStudensFromDB()
        
        sendResponse(res, { 
            statusCode: httpStatus.OK,
            success : true,
            message: "Stuent fetched successfully",
            data: result
         })
    } catch (error) {
        next(error)
    }
}



// get single student
const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const result = await StudentServices.getOneStudentFromDB(id)
        sendResponse(res, { 
            statusCode: httpStatus.OK,
            success : true,
            message: "Stuent fetched successfully",
            data: result
         })

    } catch (error) {
        next(error)
    }
}


// delete a student 
const deleteOneStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const result = await StudentServices.deleteOneStudentFromDB(id)
        sendResponse(res, { 
            statusCode: httpStatus.OK,
            success : true,
            message: "Stuent fetched successfully",
            data: result
         })
    } catch (error) {
        next(error)
    }

}


export const StudentController = {
    getAllStudens,
    getSingleStudent,
    deleteOneStudent
}
