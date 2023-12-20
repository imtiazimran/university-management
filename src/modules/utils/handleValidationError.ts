import mongoose from "mongoose";
import { TErrorSource } from "./handleZodError";
export type TGenericErrorResponse = {
    statusCode: number,
    message: string,
    errorSource: TErrorSource
}


const handleValidationError = (err: mongoose.Error.ValidationError)
: TGenericErrorResponse => {


    const errorSource: TErrorSource = Object.values(err.errors).map(
        (val: mongoose.Error.ValidatorError |
            mongoose.Error.CastError) => {

            {
                return {
                    path: val?.path,
                    message: val?.message
                }
            }

        })
        const statusCode = 400

    return {
        statusCode,
        message: "validation error",
        errorSource,
    }
}

export default handleValidationError