import { Schema, model } from "mongoose";
import { TFaculty } from "./faculty.interface";


const facultySchema = new Schema<TFaculty>({
    name: {
        type: String,
        required: true,
        unique: true
    }
},
{timestamps: true})

export const facultyModel = model<TFaculty>("AcademicFaculty", facultySchema)