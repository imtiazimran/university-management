import { Schema, model } from "mongoose";
import { TDepartment } from "./department.interface";
import AppError from "../utils/AppError";


const departmentSchema = new Schema<TDepartment>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "AcademicFaculty"
    }
},
{timestamps: true})

departmentSchema.pre('save', async function(next){
    const isDepExist = await departmentModel.findOne({id: this.id})
    if(isDepExist){
        throw new Error('This department is already exist')
    }

    next()
})




departmentSchema.pre('findOneAndUpdate', async function(next){
    const query = this.getQuery()
    const isDepExist = await departmentModel.findOne(query)
    if(!isDepExist){
        throw new AppError(404,'This department is not exist')
    }

    next()
})


export const departmentModel = model<TDepartment>("AcademicDepartment", departmentSchema)