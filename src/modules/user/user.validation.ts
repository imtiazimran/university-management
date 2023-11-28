import { z } from "zod";

const userValidationSchema = z.object({
    password: z.string({
        invalid_type_error: "password mustbe string"
    }).max(20, {message: "password can't be more then 20 charecters"}).optional() 
})

export const zodValidation = {
    userValidationSchema
};