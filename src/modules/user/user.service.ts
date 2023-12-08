import mongoose from "mongoose"
import config from "../../config"
import { AcademicSemisterModel } from "../academicSemister/academicSemister.model"
import { TStudent } from "../student/student.interface"
import { studentModel } from "../student/student.model"
import { TUser } from "./user.interface"
import { UsersModel } from "./user.model"
import { genaretStudentId } from "./user.utils"
import AppError from "../utils/AppError"
import httpStatus from "http-status"


const createStudentIntoDb = async (password: string, payload: TStudent) => {

  // using the custom made statics
  // if (await studentModel.isUserExist(student.id)) {
  //     throw new Error("This User is already exist ")
  // }
  const user: Partial<TUser> = {}

  user.password = password || (config.default_password as string)



  // set student role
  user.role = "Student"


  // find academic semester info
  const admissionSemester = await AcademicSemisterModel.findById(
    payload.AcademicSemister,
  );

  const session = await mongoose.startSession()

  try {
    session.startTransaction()


    if (admissionSemester) {
      // set id
      user.id = await genaretStudentId(admissionSemester)

    } else {
      throw new Error("Admission semester not found");
    }


    // create a user transection 1
    const InsurtedNewUser = await UsersModel.create([user], { session })

    // create a student

    if (!InsurtedNewUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }


    // set id and _id
    payload.id = InsurtedNewUser[0].id;
    payload.user = InsurtedNewUser[0]._id // reference _id


    // transiction - 2
    const newStudent = await studentModel.create([payload], { session })
    
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "error occured and while creating new student")
    }


    await session.commitTransaction()
    await session.endSession()

    return newStudent

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }


}


export const UserService = {
  createStudentIntoDb
}