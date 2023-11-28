import config from "../../config"
import { TStudent } from "../student/student.interface"
import { studentModel } from "../student/student.model"
import {  TUser } from "./user.interface"
import { UsersModel } from "./user.model"


const createStudentIntoDb = async (password: string, student: TStudent) => {

    // using the custom made statics
    // if (await studentModel.isUserExist(student.id)) {
    //     throw new Error("This User is already exist ")
    // }
    const user : Partial<TUser> = {}

    user.password = password || (config.default_password as string)

    
    
    // set student role
    user.role = "Student"
    // set manual genareted ID
    user.id = "2030100001"

    // create a user
    const InsurtedNewUser = await UsersModel.create(user) 

    // create a student

    if(Object.keys(InsurtedNewUser).length){
        // set id and _id
        student.id = InsurtedNewUser.id;
        student.user = InsurtedNewUser._id // reference _id

        const newStudent = await studentModel.create(student)
        return newStudent
    }

}


export const UserService = {
    createStudentIntoDb
}