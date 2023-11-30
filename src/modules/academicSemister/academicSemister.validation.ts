import {  z } from "zod";
import { monthsSchema } from "./academicSemister.model";


// Define a Zod schema for the academic semester
const AcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum(['Autumn', 'Summar', 'Fall']),
        code: z.enum(["01", "02", "03"]),
        year: z.string(),
        startMonth: z.enum([...monthsSchema] as [string, ...string[]]),
        endMonth: z.enum([...monthsSchema] as [string, ...string[]]),
    })
})
const UpdateAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum(['Autumn', 'Summar', 'Fall']).optional(),
        code: z.enum(["01", "02", "03"]).optional(),
        year: z.string().optional(),
        startMonth: z.enum([...monthsSchema] as [string, ...string[]]).optional(),
        endMonth: z.enum([...monthsSchema] as [string, ...string[]]).optional(),
    })
})


export const validate = {
    AcademicSemesterValidationSchema,
    UpdateAcademicSemesterValidationSchema
};
