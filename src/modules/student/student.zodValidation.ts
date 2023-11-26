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

const studentZodValidatorSchema = z.object({
    id: z.string().min(1).max(50),
    password: z.string().min(8).max(20),
    name: userNameSchema,
    gender: z.enum(["male", "female", "Other"]),
    dateOfBirth: z.string().min(1),
    email: z.string().min(1).max(50),
    contactNo: z.string().min(1).max(15),
    bloodGroup: z.enum(["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"]),
    presentAddress: z.string().min(1),
    permanentAddress: z.string().min(1),
    gurdian: gurdianSchema,
    profileImg: z.string().optional(),
    isActive: z.enum(["active", "blocked"]).default("active"),
    // isDeleted: z.boolean()
});

export default studentZodValidatorSchema;
