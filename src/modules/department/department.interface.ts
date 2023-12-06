import { Types } from "mongoose"

export type TDepartment = {
    name: {
        type: string,
    }
    faculty: Types.ObjectId;
}