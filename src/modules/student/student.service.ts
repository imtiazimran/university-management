import { TStudent } from "./student.interface";
import { studentModel } from "./student.model";


const createStudentIntoDb = async (student: TStudent) => {

    // using the custom made statics
    if (await studentModel.isUserExist(student.id)) {
        throw new Error("This User is already exist ")
    }
    const result = await studentModel.create(student) // built in static method


    // const studentInstance = new studentModel(student) // create a instance 

    // if(await studentInstance.isStudentExist(student.id)){
    //     throw new Error("User already Exist")
    // }

    // const result = await studentInstance.save()   // built in instance method

    return result
}

const getAllStudensFromDB = async () => {
    const result = await studentModel.find()
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
    const result = await studentModel.updateOne({ id }, { isDeleted: true })
    return result
}

export const StudentServices = {
    createStudentIntoDb,
    getAllStudensFromDB,
    getOneStudentFromDB,
    deleteOneStudentFromDB
}