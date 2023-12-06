import { TAcademicSemister } from "../academicSemister/academicSemister.interface";
import { UsersModel } from "./user.model";

export const findLastStudentId = async () => {
    const lastStudent = await UsersModel.findOne(
        { role: "Student" },
        { id: 1, _id: 0 }
    ).sort({ createdAt: -1 }).lean();
    return lastStudent?.id ? lastStudent.id : undefined;
};

export const genaretStudentId = async (payload: TAcademicSemister) => {
    let currentId = (0).toString();

    const lastStudentId = await findLastStudentId()

    // get last semiter info
    const lastSemisterCode = lastStudentId?.substring(4, 6)
    const lastStudentYear = lastStudentId?.substring(0, 4)
    // get current semister Info
    const currentSemisterCode = payload.code;
    const currentYear = payload.year;

    if (lastStudentId &&
        lastSemisterCode === currentSemisterCode &&
        lastStudentYear === currentYear) {
        currentId = lastStudentId.substring(6)
    }

    let incrementedId = (Number(currentId) + 1).toString().padStart(4, "0");

    incrementedId = `${payload.year}${payload.code}${incrementedId}`;

    return incrementedId;
}

