import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;

export const verifyTokenMiddleware = (req, res, next) => {

    const token = req?.cookies?.access_token;

    if (!token) {
        return res.status(403).json({
            success: false,
            message: "Unauthorized!!! -- Please login first!!.",
        });
    }

    jwt.verify(token, process.env.access_token_secret, (error, user) => {
        if (error) {
            return res.status(403).json({
                success: false,
                message: `Unauthorized!!! -- Invalid token. ${error.message}`,
            });
        }

        req.userId = user?.userId


        return next();
    });
};