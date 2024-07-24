import jwt from "jsonwebtoken"
export function checkRole(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization
            if(!token){
                return res.status(401).json({message:"user not authorised"})
            }
            const splittoken = req.headers.authorization.split(' ')[1]
            const decoded=jwt.verify(splittoken, process.env.SECRET_KEY)
            console.log("ebaaaaaaa acsess gaid")
            if (decoded.role !== role) {
                return res.status(403).json({message: "Нет доступа"})
            }
            req.user = decoded;
            next()
        } catch (e) {
            res.status(401).json({message: "Не авторизован"})
        }
    };
}