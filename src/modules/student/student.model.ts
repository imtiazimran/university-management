import { Schema, model } from 'mongoose';
import {  Student, UserName } from './student.interface';

const userNameSchema = new Schema<UserName>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

// const gurdianSchema = new Schema<Gurdian>({
//     fatherName: { type: String, required: true },
//     fatherOccupation: { type: String, required: true },
//     fatherContactNo: { type: String, required: true },
//     motherName: { type: String, required: true },
//     motherOccupation: { type: String, required: true },
//     motherContactNo: { type: String, required: true },
// });

const studentSchema = new Schema<Student>({
    id: { type: String },
    name: userNameSchema,
    gender: { type: String, enum: ["male", "female"], required: true },
    dateOfBirth: { type: String },
    email: { type: String, required: true },
    contactNo: { type: String}, 
    bloodGroup: { type: String, enum: ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"] },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    gurdian: {
        fatherName: { type: String, required: true },
        fatherOccupation: { type: String, required: true },
        fatherContactNo: { type: String, required: true },
        motherName: { type: String, required: true },
        motherOccupation: { type: String, required: true },
        motherContactNo: { type: String, required: true },
    },
    profileImg: { type: String },
    isActive: { type: String, enum: ["active", "blocked"], required: true }
});

export const studentModel = model<Student>("Student", studentSchema);
