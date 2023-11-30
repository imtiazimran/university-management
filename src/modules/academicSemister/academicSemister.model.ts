import { Schema, model } from "mongoose";
import { TAcademicSemister, TMonths } from "./academicSemister.interface";

export const monthsSchema : TMonths[] = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];


const academicSemisterSchema = new Schema<TAcademicSemister>({
    name: {type: String,enum: [ 'Autumn' , 'Summar' , 'Fall'] ,  required: true},
    code: {type: String, enum: ["01" , "02" , "03"], required: true},
    year: {type: String, required: true},
    startMonth: {type: String, enum: monthsSchema, required: true},
    endMonth: {type: String, enum: monthsSchema, required: true},
}, {timestamps: true})


// check same semister is already exist on same year
academicSemisterSchema.pre('save', async function(next){
    const isSemisterExist = await AcademicSemisterModel.findOne({
        name: this.name,
        year: this.year
    })

    if (isSemisterExist) {
        throw new Error("Semister Already exist in this year")
    } else {
        next()
    }
})


export const AcademicSemisterModel = model<TAcademicSemister>("Academic Semister", academicSemisterSchema)