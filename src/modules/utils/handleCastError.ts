import mongoose from "mongoose"
import { TGenericErrorResponse } from "./handleValidationError"
import { TErrorSource } from "./handleZodError"


const handleCastError = (err: mongoose.Error.CastError)
    : TGenericErrorResponse => {


    const errorSource: TErrorSource = [{
        path: err?.path,
        message: err?.message
    }]

const statusCode = 400

return {
    statusCode,
    message: "Invalid id paramiters",
    errorSource,
}
}

export default handleCastError