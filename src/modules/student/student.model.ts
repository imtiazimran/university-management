import validator from 'validator';
import { Schema, model } from 'mongoose';
import { Gurdian, Student, UserName } from './student.interface';

const userNameSchema = new Schema<UserName>({
    firstName: {
        type: String,
        trim: true,
        required: [true, "First name is required"],
        validate: function (value: string) {
            const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
            return firstNameStr === value;
        }
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        // validate: {
        //     validator: (value: string) => validator.isAlpha(value),
        //     message: '{VALUE} is not valid'
        // }
    }
});
 
const gurdianSchema = new Schema<Gurdian>({
    fatherName: { type: String, required: [true, "Father's name is required"] },
    fatherOccupation: { type: String, required: [true, "Father's occupation is required"] },
    fatherContactNo: { type: String, required: [true, "Father's contact number is required"] },
    motherName: { type: String, required: [true, "Mother's name is required"] },
    motherOccupation: { type: String, required: [true, "Mother's occupation is required"] },
    motherContactNo: { type: String, required: [true, "Mother's contact number is required"] },
});

const studentSchema = new Schema<Student>({
    id: { type: String, required: [true, "Student ID is required and must be unique"] },
    name: { type: userNameSchema, required: [true, "Student's name is required"] },
    gender: { type: String, enum: ["male", "female", "Other"], required: [true, "Gender is required"] },
    dateOfBirth: { type: String, required: [true, "Date of birth is required"] },
    email: { 
        type: String,
         required: [true, "Email is required and must be unique"],
          unique: true,
        //   validate: {
        //     validator: (value: string)=> validator.isEmail(value),
        //     message: "{VALUE} is not a valid email"  
        //   },
        },
    contactNo: { type: String, required: [true, "Contact number is required"] },
    bloodGroup: { type: String, enum: ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"], required: [true, "Blood group is required"] },
    presentAddress: { type: String, required: [true, "Present address is required"] },
    permanentAddress: { type: String, required: [true, "Permanent address is required"] },
    gurdian: { type: gurdianSchema, required: [true, "Guardian information is required"] },
    profileImg: { type: String },
    isActive: { type: String, enum: ["active", "blocked"], default: "active" }
});

export const studentModel = model<Student>("Student", studentSchema);
