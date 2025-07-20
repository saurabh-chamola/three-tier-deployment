import express from "express"
import authControllers from "../controllers/auth.js"
const router = express.Router()
router.post("/signup", authControllers.signup)
router.post("/signin", authControllers.login)
router.post("/logout", authControllers.logout)

export default router