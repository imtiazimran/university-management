


export interface Gurdian {
    fatherName: string,
    fatherOccupation: string,
    fatherContactNo: string,
    motherName: string,
    motherOccupation: string,
    motherContactNo: string,
}

export interface UserName {
    firstName: string,
    lastName: string
}

export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";

export interface Student {
    id: string,
    name: UserName,
    gender: "male" | "female",
    email: string,
    dateOfBirth?: string,
    contactNo: string,
    emargencyContactNo: string,
    bloodGroup?: BloodGroup,
    presentAddress: string,
    permanentAddress: string,
    gurdian: Gurdian,
    profileImg?: string,
    isActive: "active" | "blocked"
}