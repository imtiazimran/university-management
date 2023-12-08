
import mongoose from "mongoose";
import { studentModel } from "./student.model";
import AppError from "../utils/AppError";
import httpStatus from "http-status";
import { UsersModel } from "../user/user.model";


const getAllStudensFromDB = async () => {
    const result = await studentModel.find()
        .populate('AcademicSemister')
        .populate({
            path: "AcademicDepartment",
            populate: {
                path: "faculty"
            }
        })
    return result
}

const getOneStudentFromDB = async (id: string) => {
    // const result = await studentModel.findOne(id)

    const result = await studentModel.aggregate([
        { $match: { id: id } }
    ])

    return result
}

const deleteOneStudentFromDB = async (id: string) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const deleteStudent = await studentModel.updateOne(
            { id },
            { isDeleted: true },
            {new: true, session}
            )

        if(!deleteStudent){
            throw new AppError(httpStatus.BAD_REQUEST, "faild to delete student")
        }

        const deleteUser = await UsersModel.updateOne(
            { id },
            { isDeleted: true },
            {new: true, session}
            )

            if(!deleteUser){
                throw new AppError(httpStatus.BAD_REQUEST, "faild to delete user")
            }

            await session.commitTransaction()
            await session.endSession()

        return deleteStudent
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
    }

}

export const StudentServices = {
    getAllStudensFromDB,
    getOneStudentFromDB,
    deleteOneStudentFromDB
}