/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-console */

import { Schema, model } from 'mongoose';
import { TGurdian, TStudent, TStudentModel, TUserName } from './student.interface';
import bcrypt from 'bcrypt'
import config from '../../config';
const userNameSchema = new Schema<TUserName>({
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

const gurdianSchema = new Schema<TGurdian>({
    fatherName: { type: String, required: [true, "Father's name is required"] },
    fatherOccupation: { type: String, required: [true, "Father's occupation is required"] },
    fatherContactNo: { type: String, required: [true, "Father's contact number is required"] },
    motherName: { type: String, required: [true, "Mother's name is required"] },
    motherOccupation: { type: String, required: [true, "Mother's occupation is required"] },
    motherContactNo: { type: String, required: [true, "Mother's contact number is required"] },
});

const studentSchema = new Schema<TStudent, TStudentModel>({
    id: { type: String, required: [true, "Student ID is required and must be unique"] },
    password: { type: String, maxlength: [20, "password can't be more then 20 charecters"], required: [true, "Password is required and must be unique"] },
    name: { type: userNameSchema, required: [true, "Student's name is required"] },
    gender: { type: String, enum: ["male", "female", "Other"], required: [true, "Gender is required"] },
    dateOfBirth: { type: String, required: [true, "Date of birth is required"] },
    email: {
        type: String,
        required: [true, "Email is required and must be unique"]
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
    isActive: { type: String, enum: ["active", "blocked"], default: "active" },
    isDeleted: { type: Boolean, default: false }
},
{
    toJSON: {
        virtuals: true
    }
});




// pre save middlewere / is gonna work on creating fucntion

studentSchema.pre("save", async function (next) {
    // console.log(this, "pre hook: we are gonna save this");
    const student = this
    student.password = await bcrypt.hash(student.password, Number(config.salt_round))
    next()
})

// post save middlewere / is gonna work after saving the data in to the database

studentSchema.post('save', function (currentSavedDoc, next) {
    currentSavedDoc.password = ''
    console.log(currentSavedDoc, ' this is post hook: data saved successfully');
    next()
})

// pre query middlewere 
studentSchema.pre('find', function (next) {
    const allStudents = this
    allStudents.find({ isDeleted: { $ne: true } })
    next()
})

// pre query for findOne
studentSchema.pre('findOne', function (next) {
    const singleStudent = this
    singleStudent.find({ isDeleted: { $ne: true } })
    next()
})

// pre for aggregator
studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
    next()
})


// creating a virtual field
studentSchema.virtual('fullName').get(function () {
    return (
        `${this.name.firstName} ${this.name.lastName}`
    )
})



// using custom static method

studentSchema.statics.isUserExist = async (id: string) => {
    const existingUser = await studentModel.findOne({ id })
    return existingUser
}


// using of custom made instance methods 

// studentSchema.methods.isStudentExist = async (id: string) => {
//     const findExistingUser = await studentModel.findOne({id})
//     return findExistingUser;
// }

export const studentModel = model<TStudent, TStudentModel>("Student", studentSchema);
