// import studentZodValidatorSchema from "../student/student.zodValidation"
import { UserService } from "./user.service"
import sendResponse from "../utils/sendRes"
import httpStatus from "http-status";
import  catchAsync  from "../utils/catchAsync";


const createStudent = catchAsync(async (req, res) => {
    const { password, student } = req.body

        // const { error, value } = studentJoiSchema.validate(student)

        // const zodValidData = studentZodValidatorSchema.parse(student)

    const result = await UserService.createStudentIntoDb(password, student)

    // send response
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "user created successfully",
        data: result
    })
})

export const UserController = {
    createStudent
}