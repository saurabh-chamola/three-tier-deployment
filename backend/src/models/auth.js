import mongoose, { model, Schema } from "mongoose";

const authSchema = new Schema({
    name: {
        type: String,
        required: [true, "topic is required!!"]
    },
    email: {
        type: String,
        required: [true, "email is required!!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!!"]
    }

}, { timestamps: true })

const auth = model("Auth", authSchema)
export default auth