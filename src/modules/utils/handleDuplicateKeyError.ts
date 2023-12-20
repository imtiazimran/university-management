/* eslint-disable @typescript-eslint/no-explicit-any */

import { TGenericErrorResponse } from "./handleValidationError"
import { TErrorSource } from "./handleZodError"


const handleDuplicateKeyError = (err: any)
    : TGenericErrorResponse => {

    const match = err.message.match(/"([^"]*)"/)

    const message = match && match[1]
    const errorSource: TErrorSource = [{
        path: '',
        message: message + " is already exist"
    }]

    const statusCode = 400

    return {
        statusCode,
        message: "Duplicate Key/Value",
        errorSource,
    }
}


export default handleDuplicateKeyError