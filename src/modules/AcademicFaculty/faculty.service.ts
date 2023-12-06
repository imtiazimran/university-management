import { TFaculty } from "./faculty.interface";
import { facultyModel } from "./faculty.model";

const createFacultyInDB = async (payload: TFaculty)=>{
    const result = await facultyModel.create(payload)
    return result
}

const getAllFacultyFromDB =async () => {
    const result = await facultyModel.find()
    return result
}

const getOneFacultyFromDB =async (id: string) => {
    const result = await facultyModel.findOne({id})
    return result
}

const UpdateFacultyFromDB =async (id: string, payload: Partial<TFaculty>) => {
    const result = await facultyModel.findOneAndUpdate({_id: id}, payload, {new: true})
    return result
}

export const FacultyService ={
    createFacultyInDB,
    getAllFacultyFromDB,
    getOneFacultyFromDB,
    UpdateFacultyFromDB
}