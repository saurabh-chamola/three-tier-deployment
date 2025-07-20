import mongoose, { model, Schema } from "mongoose";

const postSChema = new Schema({
    topic: {
        type: String,
        required: [true, "topic is required!!"]
    },
    message: {
        type: String,
        required: [true, "Message is required!!"]
    },

    categories: { type: [], required: [true, "Category is required!!"] },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
    }
}, { timestamps: true })

const Post = model("Post", postSChema)
export default Post