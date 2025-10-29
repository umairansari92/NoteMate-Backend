import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No Token is provided", status: false });
        }
        const token = authHeader.split(" ")[1]
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decode.id).select("-password");
        if (!req.user) {
            return res.status(401).json({ message: "User not found", status: false });
        }
        console.log(req.user);

        next();


    } catch (error) {
        res.status(401).json({ message: "Unauthorized. Token invalid", status: false });
    }
}

export default authMiddleware;