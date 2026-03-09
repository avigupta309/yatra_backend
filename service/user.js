import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv()
const secretKey = process.env.SECRET_KEY;

export const createToken = (user) => {
    const userPayload = {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        phone:user.phoneNumber,
        role: user.role
    }
    const token = jwt.sign(userPayload, secretKey)
    return token
}

export const veriFyToken = (token) => {
    try {
        const verifiedUser = jwt.verify(token, secretKey)
        if (!verifiedUser) return res.status(400).json({ data: "Token is  Match" });
        return verifiedUser
    } catch (error) {
        throw new Error("Password Not match")
    }
}