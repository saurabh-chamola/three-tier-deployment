import Auth from "../models/auth.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const authControllers = {
    signup: async (req, res) => {
        try {
            const { password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new Auth(req.body);
            newUser.password = hashedPassword;

            await newUser.save();
            return res.status(201).json({ status: true, message: "User created successfully" });
        } catch (e) {
            return res.status(400).json({ status: false, message: e?.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, name, password } = req.body;

            const existingUser = await Auth.findOne({
                $or: [{ email }, { name }]
            });


            if (!existingUser) {
                return res.status(400).json({
                    status: false,
                    message: "User not found! Please check your credentials."
                });
            }

            const isPasswordValid = await bcrypt.compare(password, existingUser.password);

            if (!isPasswordValid) {
                return res.status(400).json({
                    status: false,
                    message: "Invalid password. Please try again."
                });
            }

            const accessToken = jwt.sign({ userId: existingUser._id, email }, process.env.access_token_secret, { expiresIn: "15m" })
            res.cookie("access_token", accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production" })

            return res.status(200).json({
                status: true,
                message: "Logged in successfully!",
                user: {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email
                }
            });

        } catch (e) {
            return res.status(500).json({
                status: false,
                message: e?.message || "Internal server error during login."
            });
        }
    },
   logout: async (req, res) => {
    try {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");

        return res.status(200).json({
            status: true,
            message: "Logout successfully!!"
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: e?.message || "Internal server error during logout."
        });
    }
}





}

export default authControllers