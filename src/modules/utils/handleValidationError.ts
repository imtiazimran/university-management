import mongoose from "mongoose";
import { TErrorSource } from "./handleZodError";

const handleValidationError = (err: mongoose.Error.ValidationError) => {
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
        errorSource,
        message: "validation error",
        // errorSource
    }
}

export default handleValidationError