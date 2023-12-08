import z from 'zod';

const userNameSchema = z.object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
});

const gurdianSchema = z.object({
    fatherName: z.string().min(1).max(50),
    fatherOccupation: z.string().min(1).max(50),
    fatherContactNo: z.string().min(1).max(15),
    motherName: z.string().min(1).max(50),
    motherOccupation: z.string().min(1).max(50),
    motherContactNo: z.string().min(1).max(15),
});

const studentCreateValidatorSchema = z.object({
    body: z.object({
        password: z.string().min(8).max(20),
        student: z.object({
            name: userNameSchema,
            gender: z.enum(["male", "female", "Other"]),
            dateOfBirth: z.string(),
            email: z.string().min(1).max(50),
            contactNo: z.string().min(1).max(15),
            bloodGroup: z.enum(["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"]),
            presentAddress: z.string().min(1),
            permanentAddress: z.string().min(1),
            gurdian: gurdianSchema,
            isDeleted: z.boolean().default(false),
            AcademicSemister: z.string(),
            AcademicDepartment: z.string(),
            profileImg: z.string().optional()
        })
    })
});

// for updating data

const updateUserNameSchema = z.object({
    firstName: z.string().min(1).max(50).optional(),
    lastName: z.string().min(1).max(50).optional(),
});

const updateGurdianSchema = z.object({
    fatherName: z.string().min(1).max(50).optional(),
    fatherOccupation: z.string().min(1).max(50).optional(),
    fatherContactNo: z.string().min(1).max(15).optional(),
    motherName: z.string().min(1).max(50).optional(),
    motherOccupation: z.string().min(1).max(50).optional(),
    motherContactNo: z.string().min(1).max(15).optional(),
});

const updateStudentSchema = z.object({
    body: z.object({
        student: z.object({
            name: updateUserNameSchema.optional(),
            gender: z.enum(["male", "female", "Other"]).optional(),
            dateOfBirth: z.string().optional(),
            email: z.string().min(1).max(50).optional(),
            contactNo: z.string().min(1).max(15).optional(),
            bloodGroup: z.enum(["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"]).optional(),
            presentAddress: z.string().min(1).optional(),
            permanentAddress: z.string().min(1).optional(),
            gurdian: updateGurdianSchema.optional(),
            isDeleted: z.boolean().optional(),
            AcademicSemister: z.string().optional(),
            AcademicDepartment: z.string().optional(),
            profileImg: z.string().optional()
        }).optional()
    })
});



export const validation = {
    studentCreateValidatorSchema,
    updateStudentSchema
};
