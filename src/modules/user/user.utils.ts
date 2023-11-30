import { TAcademicSemister } from "../academicSemister/academicSemister.interface";
import { UsersModel } from "./user.model";

export const findLastStudentId = async () => {
    const lastStudent = await UsersModel.findOne(
        { role: "Student" },
        { id: 1, _id: 0 }
    ).sort({ createdAt: -1 }).lean();
    return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const genaretStudentId = async (payload: TAcademicSemister) => {
    const currentId = await findLastStudentId() || (0).toString();
    let incrementedId = (Number(currentId) + 1).toString().padStart(4, "0");

    incrementedId = `${payload.year}${payload.code}${incrementedId}`;

    return incrementedId;
}

