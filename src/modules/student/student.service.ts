
import { studentModel } from "./student.model";


const getAllStudensFromDB = async () => {
    const result = await studentModel.find()
    .populate('AcademicSemister')
    .populate({
        path: "AcademicDepartment",
        populate:{
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
    const result = await studentModel.updateOne({ id }, { isDeleted: true })
    return result
}

export const StudentServices = {
    getAllStudensFromDB,
    getOneStudentFromDB,
    deleteOneStudentFromDB
}