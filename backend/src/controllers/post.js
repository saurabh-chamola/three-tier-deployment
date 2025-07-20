import Post from "../models/post.js"

const postController = {
    newPost: async (req, res) => {
        try {
            const newPost = new Post(req.body)
            await newPost.save()
            res.status(201).json({ message: "Post created Successfully!!" })
        }
        catch (e) {
            return res.status(400).json({ status: true, message: e?.message })
        }
    },
    getPost: async (req, res) => {
        try {
            const posts = await Post.find().populate("created_by", ["_id", "email"])
            return res.status(200).json({ status: true, data: posts })
        }
        catch (e) {
            return res.status(400).json({ status: true, message: e?.message })
        }
    },
    deletePost: async (req, res) => {
        try {
            await Post.findByIdAndDelete(req.params.id)
            return res.status(200).json({ status: true, message: "Post deleted Successfully!!" })
        }
        catch (e) {

            return res.status(400).json({ status: true, message: e?.message })
        }
    },

    udatePost: async (req, res) => {
        try {
            await Post.findByIdAndUpdate(req.params.id, req.body)
            return res.status(200).json({ status: true, message: "Post updated Successfully!!" })
        }
        catch (e) {

            return res.status(400).json({ status: true, message: e?.message })
        }
    }
}

export default postController