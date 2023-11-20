/* eslint-disable no-console */
import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentJoiSchema from "./student.validation";



const createStudent = async (req: Request, res: Response) => {

    try {
        const { student } = req.body

        const { error } = studentJoiSchema.validate(student)


        if (error) {
            res.status(500).json({
                success: false,
                message: `${error.message}`,
                error: error.details
            })
        }

        const result = await StudentServices.createStudentIntoDb(student)

        // send response
        res.status(200).json({
            success: true,
            message: "Student Created Successfully",
            data: result
        })
    } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.log({ error });
    }
}

const getAllStudens = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudensFromDB()
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

const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
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

export const StudentController = {
    createStudent,
    getAllStudens,
    getSingleStudent
} 