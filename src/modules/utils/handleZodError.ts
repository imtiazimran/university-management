import { ZodError, ZodIssue } from "zod"


export type TErrorSource = {
    path: string | number,
    message: string
}[]
const handleZodError = (err: ZodError) => {
    const errorSource: TErrorSource = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue?.message
        }
    })

    const statusCode = 400

    return {
        statusCode,
        message: "zood validation error",
        errorSource
    }
}

export default handleZodError