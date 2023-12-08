
import mongoose from "mongoose";
import { studentModel } from "./student.model";
import AppError from "../utils/AppError";
import httpStatus from "http-status";
import { UsersModel } from "../user/user.model";
import { TStudent } from "./student.interface";


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

    const result = await studentModel.findOne({id})
    return result
}
const updateStudntFromDB = async (id: string, payload: Partial<TStudent>) => {
    const { name, gurdian, ...restData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = { ...restData }

    // modify name object
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value
        }
    }
    // modify gurdian object
    if (gurdian && Object.keys(gurdian).length) {
        for (const [key, value] of Object.entries(gurdian)) {
            modifiedUpdatedData[`gurdian.${key}`] = value
        }
    }

    const result = await studentModel.findOneAndUpdate(
        { id },
        modifiedUpdatedData,
        {
            new: true,
            runValidators: true
        },
    )
    return result
}

const deleteOneStudentFromDB = async (id: string) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const deleteStudent = await studentModel.updateOne(
            { id },
            { isDeleted: true },
            { new: true, session }
        )

        if (!deleteStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, "faild to delete student")
        }

        const deleteUser = await UsersModel.updateOne(
            { id },
            { isDeleted: true },
            { new: true, session }
        )

        if (!deleteUser) {
            throw new AppError(httpStatus.BAD_REQUEST, "faild to delete user")
        }

        await session.commitTransaction()
        await session.endSession()

        return deleteStudent
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(httpStatus.FAILED_DEPENDENCY, "feiled to delete student")
    }

}

export const StudentServices = {
    getAllStudensFromDB,
    getOneStudentFromDB,
    deleteOneStudentFromDB,
    updateStudntFromDB
}