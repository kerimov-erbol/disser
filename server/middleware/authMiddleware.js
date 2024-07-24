import jwt from "jsonwebtoken"

export function authorisation(req,res,next){
    if(res.method==="OPTIONS"){
        next()
    }
    try {
        const token = req.headers.authorization
        console.log(token)
        if(!token){
             return res.status(401).json({message:"user not authorised"})
        }
        const splittoken = req.headers.authorization.split(' ')[1]
        const decoder=jwt.verify(splittoken, process.env.SECRET_KEY)
        req.user=decoder
        next()
    } catch (error) {
        return res.status(401).json({message:"user not authorised"})
        
    }
}