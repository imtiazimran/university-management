/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentZodValidatorSchema from "./student.zodValidation";



const createStudent = async (req: Request, res: Response) => {

    try {
        const { student } = req.body

        // const { error, value } = studentJoiSchema.validate(student)

        const zodValidation = studentZodValidatorSchema.parse(student)

        // if (error) {
        //     res.status(500).json({
        //         success: false,
        //         message: `${error.message}`,
        //         error: error.details
        //     })
        // }

        const result = await StudentServices.createStudentIntoDb(zodValidation)

        // send response
        res.status(200).json({
            success: true,
            message: "Student Created Successfully",
            data: result
        })
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message || "something went wrong on the controller",
            error
        })
    }
}

// get all student
const getAllStudens = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudensFromDB()
        
        res.status(200).json({
            success: true,
            message: `${result.length} data found`,
            data: result
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "something went wrong on the controller",
        })
    }
}



// get single student
const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const result = await StudentServices.getOneStudentFromDB(id)
        res.status(200).json({
            success: true,
            message: "Student Found",
            data: result
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "something went wrong on the controller",
        })
    }
}


// delete a student 
const deleteOneStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await StudentServices.deleteOneStudentFromDB(id)
        res.status(200).json({
            success: true,
            message: "Student is deleted succssfully",
            data: result
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "something went wrong on the controller",
        })
    }

}


export const StudentController = {
    createStudent,
    getAllStudens,
    getSingleStudent,
    deleteOneStudent
}
