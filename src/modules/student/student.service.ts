
import mongoose from "mongoose";
import { studentModel } from "./student.model";
import AppError from "../utils/AppError";
import httpStatus from "http-status";
import { UsersModel } from "../user/user.model";
import { TStudent } from "./student.interface";
import QueryBuilder from "../../builder/QueryBuilder";


const getAllStudensFromDB = async (query: Record<string, unknown>) => {

    // const queryObj = { ...query }

    const searchAbleFields = ['email', 'name.firstName', 'presentAddress']

    // let searchTerm = "";

    // if (query?.searchTerm) {
    //     searchTerm = query?.searchTerm as string
    // }

    // const searchQuery = studentModel.find(
    //     {
    //         $or: searchAbleFields
    //             .map((field) => ({
    //                 [field]: { $regex: searchTerm, $options: 'i' }
    //             }))
    //     }
    // )

    // const excludeFields = ['searchTerm', 'sort']

    // excludeFields.forEach((item) => delete queryObj[item])


    //     console.log(queryObj)

    // const filterQuery = searchQuery.find(queryObj)
    //     .populate('AcademicSemister')
    //     .populate({
    //         path: "AcademicDepartment",
    //         populate: {
    //             path: "faculty"
    //         }
    //     })
    // let sort = '-createdAt'

    // if (query.sort) {
    //     sort = query.sort as string
    // }

    // const sortQuery = filterQuery.sort(sort)


    // let limit = 1

    // if(query.limit){
    //     limit = Number(query.limit)
    // }

    // const limitQuery = await sortQuery.limit(limit)

    const studentQuery = new QueryBuilder(studentModel.find()
        .populate('AcademicSemister')
        .populate({
            path: "AcademicDepartment",
            populate: {
                path: "faculty"
            }
        }),
        query
    )
        .search(searchAbleFields)
        .filter()
        .sort()
        .paginate()
        .fields()

    const result = await studentQuery.modelQuery
    // console.log(result, studentQuery)
    return result
}

const getOneStudentFromDB = async (id: string) => {
    // const result = await studentModel.findOne(id)

    const result = await studentModel.findById( id )
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

    const result = await studentModel.findByIdAndUpdate(
         id ,
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
        const deleteStudent = await studentModel.findByIdAndUpdate(
             id ,
            { isDeleted: true },
            { new: true, session }
        )

        if (!deleteStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, "faild to delete student")
        }

        // get the ref id from deleted student
        const userId = deleteStudent.user 

        const deleteUser = await UsersModel.findOneAndUpdate(
            userId ,
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