import { z } from "zod";

const facultyValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Faculty Name Must be String"
        })
    })
})
export default facultyValidationSchema