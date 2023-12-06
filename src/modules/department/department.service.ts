import { TDepartment } from "./department.interface"
import { departmentModel } from "./department.model"


const createDepartmentInDB = async (payload: TDepartment)=>{
    const result = await departmentModel.create(payload)
    return result
}

const getAllDepartmentFromDB =async () => {
    const result = await departmentModel.find()
    return result
}

const getOneDepartmentFromDB =async (id: string) => {
    const result = await departmentModel.findOne({id})
    return result
}

const UpdateDepartmentFromDB =async (id: string, payload: Partial<TDepartment>) => {
    const result = await departmentModel.findOneAndUpdate({_id: id}, payload, {new: true})
    return result
}

export const DepartmentService ={
    createDepartmentInDB,
    getAllDepartmentFromDB,
    getOneDepartmentFromDB,
    UpdateDepartmentFromDB
}