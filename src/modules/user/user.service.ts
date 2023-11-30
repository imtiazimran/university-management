import config from "../../config"
import { AcademicSemisterModel } from "../academicSemister/academicSemister.model"
import { TStudent } from "../student/student.interface"
import { studentModel } from "../student/student.model"
import {  TUser } from "./user.interface"
import { UsersModel } from "./user.model"
import { genaretStudentId } from "./user.utils"


const createStudentIntoDb = async (password: string, payload: TStudent) => {

    // using the custom made statics
    // if (await studentModel.isUserExist(student.id)) {
    //     throw new Error("This User is already exist ")
    // }
    const user : Partial<TUser> = {}

    user.password = password || (config.default_password as string)

    
    
    // set student role
    user.role = "Student"
    
   
    // find academic semester info
  const admissionSemester = await AcademicSemisterModel.findById(
    payload.AcademicSemister,
  );

  if (admissionSemester) {
      user.id = await genaretStudentId(admissionSemester)
    
  } else {
    throw new Error("Admission semester not found");
  }

    // set id

    // create a user
    const InsurtedNewUser = await UsersModel.create(user) 

    // create a student

    if(Object.keys(InsurtedNewUser).length){
        // set id and _id
        payload.id = InsurtedNewUser.id;
        payload.user = InsurtedNewUser._id // reference _id

        const newStudent = await studentModel.create(payload)
        return newStudent
    }

}


export const UserService = {
    createStudentIntoDb
}