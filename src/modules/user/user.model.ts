import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt"
import config from "../../config";

const userSchema = new Schema<TUser>({
    id: { type: String, required: true },
    password: { type: String, required: true},
    needPassChange: {type: Boolean, default: true},
    role: { type: String, enum: ["Student" , "Faculty" , "Admin"] },
    status: {type: String, enum: ["in-progress", "blocked"], default: "in-progress"},
    isDeleted: {type: Boolean, default: false}
},
{timestamps: true}
)


// pre save middlewere / is gonna work on creating fucntion

userSchema.pre("save", async function (next) {
    // console.log(this, "pre hook: we are gonna save this");
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const currentUser = this
    currentUser.password = await bcrypt.hash(currentUser.password, Number(config.salt_round))
    next()
})

// post save middlewere / is gonna work after saving the data in to the database

userSchema.post('save', function (currentSavedDoc, next) {
    currentSavedDoc.password = ''
    // eslint-disable-next-line no-console
    console.log(currentSavedDoc, ' this is post hook: data saved successfully');
    next()
})


export const UsersModel = model<TUser>("user", userSchema)