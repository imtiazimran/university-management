import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendRes";
import { DepartmentService } from "./department.service";

const createDepartment = catchAsync(async (req, res) =>{
    const newDepartment = req.body

    const result = await DepartmentService.createDepartmentInDB(newDepartment)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Department Created succesfully",
        data: result
    })
})



const AllDepartment = catchAsync(async (req, res)=>{
    const result = await DepartmentService.getAllDepartmentFromDB()
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: `${result.length} Department found`,
        data: result
    })
})


const SingleDepartment = catchAsync(async (req, res)=>{
    const result = await DepartmentService.getOneDepartmentFromDB(req.params.id)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: `Department found`,
        data: result
    })
})


const UpdateADepartment = catchAsync(async (req, res) =>{
    const updatedDepartment = req.body;
    const result = await DepartmentService.UpdateDepartmentFromDB(req.params.id, updatedDepartment)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: `Department updated`,
        data: result
    })
})
export const DepartmentController = {
    createDepartment,
    AllDepartment,
    SingleDepartment,
    UpdateADepartment
}