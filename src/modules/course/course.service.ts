import { startSession } from "mongoose"
import QueryBuilder from "../../builder/QueryBuilder"
import { searchAbleCourseFields } from "./course.const"
import { TCourse, TCourseFaculty } from "./course.interface"
import { courseFacultyModel, courseModel } from "./course.model"
import AppError from "../utils/AppError"
import httpStatus from "http-status"

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await courseModel.create(payload)
    return result
}

const getAllCourseFromDB = async (query: Record<string, unknown>) => {

    const courseQuery = new QueryBuilder(
        courseModel.find()
            .populate('preRequisiteCourses.course'),
        query
    )
        .search(searchAbleCourseFields)
        .filter()
        .sort()
        .paginate()
        .fields()

    const result = await courseQuery.modelQuery

    return result
}


const getSingleCourseFromDB = async (id: string) => {
    const result = await courseModel.findById(id)
        .populate('preRequisiteCourses.course')
    return result
}
const deleteCourseFromDB = async (id: string) => {
    const result = await courseModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    )
    return result
}


const UpdateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourses, ...courseRemainingData } = payload;

    const session = await startSession()

    try {
        session.startTransaction()

        // step 1 
        const updateBasicCourseUpdate = await courseModel.findByIdAndUpdate(
            id,
            courseRemainingData,
            {
                new: true,
                runValidators: true,
                session
            }
        )

        if (!updateBasicCourseUpdate) {
            throw new AppError(httpStatus.BAD_REQUEST, "failed to update basic course")
        }


        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            // filter out deleted courses
            const filterDeletedCourse = preRequisiteCourses
                .filter(el => el.course && el.isDeleted)
                .map(el => el.course)

            const deletedRequisiteCourses = await courseModel.findByIdAndUpdate(
                id,
                {
                    $pull:
                    {
                        preRequisiteCourses: {
                            course: {
                                $in:
                                    filterDeletedCourse
                            }
                        }
                    }
                },
                {
                    new: true,
                    runValidators: true,
                    session
                }
            )

            if (!deletedRequisiteCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, "failed to delete PreRequisit course")
            }

            // filter out the new course fields
            const newPreRequisite = preRequisiteCourses?.filter(el => el.course && !el.isDeleted)
            const newPreRequisiteCourses = await courseModel.findByIdAndUpdate(
                id,
                {
                    $addToSet: { preRequisiteCourses: { $each: newPreRequisite } }
                },
                {
                    new: true,
                    runValidators: true,
                    session
                }
            )
            if (!newPreRequisiteCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, "failed to update PreRequisit course")
            }
        }
        await session.commitTransaction()

        await session.endSession()

        const result = await courseModel.findById(id).populate("preRequisiteCourses.course")
        return result
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course")
    }





}

const AsignFacultiesWithCourseIntoDB = async (id: string, payload: Partial<TCourseFaculty>) => {

    const result = await courseFacultyModel.findByIdAndUpdate(
        id,
        {
            course: id,
            $addToSet: { faculties: { $each: payload } }
        },
        {
            upsert: true,
            new: true
        }
    )
    return result
}
const RemoveFacultieFromCourseFromDB = async (id: string, payload: Partial<TCourseFaculty>) => {

    const result = await courseFacultyModel.findByIdAndUpdate(
        id,
        {
            $pull: { faculties: { $in: payload  } }
        },
        {
            new: true
        }
    )
    return result
}

export const CourseServices = {
    createCourseIntoDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB,
    UpdateCourseIntoDB,
    AsignFacultiesWithCourseIntoDB,
    RemoveFacultieFromCourseFromDB
}