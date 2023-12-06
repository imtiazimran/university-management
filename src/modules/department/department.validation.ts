import { z } from "zod";

const createDepartmentValidationSchema = z.object({
    body: z.object({

        name: z.string({
            invalid_type_error: "Department Name Must be String",
            required_error: "Department Name is Require"
        }),
        faculty: z.string({
            invalid_type_error: "faculty id is required",
            required_error: "Faculty id is Require"
        })
    })
})
const updateDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Department Name Must be String",
            required_error: "Department Name is Require"
        }).optional(),
        faculty: z.string({
            invalid_type_error: "faculty id is required",
            required_error: "Faculty id is Require"
        }).optional()

    })
})
export const departmentValidation = {
    createDepartmentValidationSchema,
    updateDepartmentValidationSchema
} 