import { TAcademicSemister } from "./academicSemister.interface"
import { AcademicSemisterModel } from "./academicSemister.model"
import { semisterNameCode } from "./commonConst"

const CreateSemisterInDB = async (newSemister: TAcademicSemister) => {

    if (semisterNameCode[newSemister.name] !== newSemister.code) {
        throw new Error("wrong semister code")
    }
    const result = await AcademicSemisterModel.create(newSemister)
    return result
}


const AllAcademicSemistersFromDB = async () => {
    return await AcademicSemisterModel.find()
}

const SingleAcademicSemistersFromDB = async (id: string) => {
    return await AcademicSemisterModel.findOne({ _id: id })
}


const UpdateASemisterFromDB = async (id: string, payload: Partial<TAcademicSemister>) => {
    if (payload.name &&
        payload.code &&
        semisterNameCode[payload.name] !== payload.code) {
        throw new Error("wrong semister code")
    }
    return await AcademicSemisterModel.findByIdAndUpdate(id, payload, {new: true})
}


export const AcademicSemisterService = {
    CreateSemisterInDB,
    AllAcademicSemistersFromDB,
    SingleAcademicSemistersFromDB,
    UpdateASemisterFromDB
}