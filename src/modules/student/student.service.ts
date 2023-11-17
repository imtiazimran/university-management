import { Student } from "./student.interface";
import { studentModel } from "./student.model";


const createStudentIntoDb = async (student: Student) => {


    const result = await studentModel.create(student)

    return result
}

const getAllStudensFromDB = async () => {
    const result = await studentModel.find()
    return result
}

const getOneStudentFromDB = async (id: string) => {
    const result = await studentModel.findById(id)
    return result
}

export const StudentServices = {
    createStudentIntoDb,
    getAllStudensFromDB,
    getOneStudentFromDB
}