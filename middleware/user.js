import { veriFyToken } from "../service/user.js"

export function checkAuthUser(cookieName) {
    return (req, res, next) => {
        try {
            const validCookie = req.cookies[cookieName]
            const user = veriFyToken(validCookie)
            req.validUser = user;
            next()
        } catch (error) {
            return res.status(400).json({ data: "Cookie Not Match" })
        }
    }
}