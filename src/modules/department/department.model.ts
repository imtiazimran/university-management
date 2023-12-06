import { Schema, model } from "mongoose";
import { TDepartment } from "./department.interface";


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


export const departmentModel = model<TDepartment>("AcademicDepartment", departmentSchema)