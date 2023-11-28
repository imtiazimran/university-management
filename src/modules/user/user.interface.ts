export type TUser ={
    id: string,
    password: string,
    needPassChange: boolean,
    role: "Student" | "Faculty" | "Admin",
    status: "in-progress" | "blocked" ,
    isDeleted: boolean
}

