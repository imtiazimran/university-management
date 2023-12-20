import QueryBuilder from "../../builder/QueryBuilder"
import { searchAbleCourseFields } from "./course.const"
import { TCourse } from "./course.interface"
import { courseModel } from "./course.model"

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

    // step 1 
    const updateBasicCourseUpdate = await courseModel.findByIdAndUpdate(
        id,
        courseRemainingData,
        {
            new: true,
            runValidators: true
        }
    )

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
        const filterDeletedCourse = preRequisiteCourses
            .filter(el => el.course && el.isDeleted)
            .map(el => el.course)

        const deletedRequisiteCourses = await courseModel.findByIdAndUpdate(
                id,
                {
                    $pull: { preRequisiteCourses: { course: { $in: filterDeletedCourse } } }
                }
            )

    }

    // filter out the new course fields
    const newPreRequisite = preRequisiteCourses?.filter(el => el.course && !el.isDeleted )
    console.log({newPreRequisite});
    return updateBasicCourseUpdate
}



export const CourseServices = {
    createCourseIntoDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB,
    UpdateCourseIntoDB
}