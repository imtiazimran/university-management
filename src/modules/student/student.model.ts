import { Schema, model } from 'mongoose';
import { BloodGroup, Gurdian, Student, UserName } from './student.interface';


const userNameSchema = new Schema<UserName>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
})

const gurdianSchema = new Schema<Gurdian>({
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContactNo: { type: String, required: true },
})

const blodGroupSchema = new Schema<BloodGroup>(["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"])

const studentSchema = new Schema<Student>({
    id: { type: String },
    name: userNameSchema,
    gender: ["male", "female"],
    dateOfBirth: { type: String },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emargencyContactNo: { type: String, required: true },
    bloodGroup: blodGroupSchema ,
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    gurdian: gurdianSchema,
    profileImg: { type: String },
    isActive: ["active", "blocked"]
})


// creating model
                        //generic ,  name: any, give the schema here   
export const studentModel = model<Student>("Student", studentSchema)

