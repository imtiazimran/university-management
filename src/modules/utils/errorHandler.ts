/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-cond-assign */
/* eslint-disable no-constant-condition */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import handleZodError, { TErrorSource } from "./handleZodError";
import { ZodError } from "zod";
import handleValidationError from "./handleValidationError";
import handleCastError from "./handleCastError";
import handleDuplicateKeyError from "./handleDuplicateKeyError";
import AppError from "./AppError";
import config from "../../config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalErrorHandler: ErrorRequestHandler = ((err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = err.message || "something went wrong";

    // console.log(err.code);

    let errorSource: TErrorSource = [{
        path: '',
        message: "something went wrong"
    }]




    if (err instanceof ZodError) {
        // eslint-disable-next-line no-unused-expressions
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError?.statusCode
        message = simplifiedError?.message
        errorSource = simplifiedError?.errorSource
    }
    else if (err.code = 11000) {
        const simplifiedError = handleDuplicateKeyError(err)

        statusCode = simplifiedError?.statusCode
        message = simplifiedError?.message
        errorSource = simplifiedError?.errorSource
    }
    else if (err.name = "ValidationError") {
        const simplifiedError = handleValidationError(err)

        statusCode = simplifiedError?.statusCode
        message = simplifiedError?.message
        errorSource = simplifiedError?.errorSource
    }
    else if (err.name = "CastError") {
        const simplifiedError = handleCastError(err)

        statusCode = simplifiedError?.statusCode
        message = simplifiedError?.message
        errorSource = simplifiedError?.errorSource
    }

    else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err.message;
        errorSource = [
            {
                path: '',
                message: err?.message,
            },
        ];
    } else if (err instanceof Error) {
        message = err.message;
        errorSource = [
            {
                path: '',
                message: err?.message,
            },
        ];
    }


    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        err,
        stack: config.NODE_ENV === "devolopment" ? err?.stack : null
    })


})

export default globalErrorHandler