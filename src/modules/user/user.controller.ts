import { NextFunction, Request, Response } from "express"
// import studentZodValidatorSchema from "../student/student.zodValidation"
import { UserService } from "./user.service"
import sendResponse from "../utils/sendRes"
import httpStatus from "http-status";


const createStudent = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { password, student } = req.body

        // const { error, value } = studentJoiSchema.validate(student)

        // const zodValidData = studentZodValidatorSchema.parse(student)

        const result = await UserService.createStudentIntoDb(password, student)

        // send response
        sendResponse(res, { 
            statusCode: httpStatus.OK,
            success : true,
            message: "user created successfully",
            data: result
         })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
        next(error)
    }
}

export const UserController = {
    createStudent
}