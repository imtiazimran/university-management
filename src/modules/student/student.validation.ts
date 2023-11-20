import Joi from "joi";

const userNameSchema = Joi.object({
    firstName: Joi.string().required().messages({ 'any.required': 'First name is required' }),
    lastName: Joi.string().required().messages({ 'any.required': 'Last name is required' }),
});

const gurdianSchema = Joi.object({
    fatherName: Joi.string().required().messages({ 'any.required': "Father's name is required" }),
    fatherOccupation: Joi.string().required().messages({ 'any.required': "Father's occupation is required" }),
    fatherContactNo: Joi.string().required().messages({ 'any.required': "Father's contact number is required" }),
    motherName: Joi.string().required().messages({ 'any.required': "Mother's name is required" }),
    motherOccupation: Joi.string().required().messages({ 'any.required': "Mother's occupation is required" }),
    motherContactNo: Joi.string().required().messages({ 'any.required': "Mother's contact number is required" }),
});

const studentJoiSchema = Joi.object({
    id: Joi.string().required().messages({ 'any.required': 'Student ID is required and must be unique' }),
    name: userNameSchema.required().messages({ 'any.required': "Student's name is required" }),
    gender: Joi.string().valid('male', 'female', 'Other').required().messages({ 'any.required': 'Gender is required' }),
    dateOfBirth: Joi.string().required().messages({ 'any.required': 'Date of birth is required' }),
    email: Joi.string().email().required().messages({ 'any.required': 'Email is required and must be unique', 'string.email': 'Email must be a valid email' }),
    contactNo: Joi.string().required().messages({ 'any.required': 'Contact number is required' }),
    bloodGroup: Joi.string().valid('A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-').required().messages({ 'any.required': 'Blood group is required' }),
    presentAddress: Joi.string().required().messages({ 'any.required': 'Present address is required' }),
    permanentAddress: Joi.string().required().messages({ 'any.required': 'Permanent address is required' }),
    gurdian: gurdianSchema.required().messages({ 'any.required': 'Guardian information is required' }),
    profileImg: Joi.string(),
    isActive: Joi.string().valid('active', 'blocked').default('active'),
});




export default studentJoiSchema;