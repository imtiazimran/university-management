/* eslint-disable no-unused-vars */
import { Model } from "mongoose";



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
    password: string,
    name: TUserName,
    gender: "male" | "female" | "Other",
    email: string,
    dateOfBirth?: string,
    contactNo: string,
    bloodGroup?: TBloodGroup,
    presentAddress: string,
    permanentAddress: string,
    gurdian: TGurdian,
    profileImg?: string,
    isActive: "active" | "blocked",
    isDeleted: boolean
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