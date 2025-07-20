import express from "express"
import postController from "../controllers/post.js"
import { verifyTokenMiddleware } from "../middlewares/verifyToken.js"
const router = express.Router()

router.route("/").post(verifyTokenMiddleware, postController.newPost).get(postController.getPost)
router.route("/:id").delete(verifyTokenMiddleware,postController.deletePost).patch(verifyTokenMiddleware,postController.udatePost)

export default router