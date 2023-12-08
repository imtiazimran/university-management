/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";



export interface TGurdian {
    fatherName: string,
    fatherOccupation: string,
    fatherContactNo: string,
    motherName: string,
    motherOccupation: string,
    motherContactNo: string,
}

export interface TUserName {
    firstName: string,
    lastName: string
}

export type TBloodGroup = "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";

export interface TStudent {
    id: string,
    user: Types.ObjectId;
    name: TUserName,
    gender: "male" | "female" | "Other",
    email: string,
    dateOfBirth?: string,
    contactNo: string,
    bloodGroup?: TBloodGroup,
    presentAddress: string,
    permanentAddress: string,
    gurdian: TGurdian,
    isDeleted: boolean,
    AcademicSemister: Types.ObjectId,
    AcademicDepartment: Types.ObjectId,
    profileImg?: string,
}


// for creating statics 

export interface TStudentModel extends Model<TStudent> {
    isUserExist(id: string): Promise<TStudent | null>
  }



// {
//     for using instance method 
//     export type TStudentMethod = {
//         isStudentExist(id: string): Promise<TStudent | null>
//     }
    
//     export type TStudentModel = Model<TStudent, Record<string, never>, TStudentMethod>;


// }