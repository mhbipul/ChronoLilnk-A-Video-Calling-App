import jwt from "jsonwebtoken"
import User from "../models/User.js"


export const protectRouter = async(req,res,next)=>{

    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message: "Unauthorized - No token provided"})
        }

        //verify the token, with the jwt secret key which we have created in the env file
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)

        if(!decoded){
            res.status(401).json({message: "Unauthorized - Invalid token"});
        }

        //find the user from the database by id ,using the userId which was given as payload in the token of jwt.
        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            res.status(401).json({message: " Unauthorized - User not found"});
        }

        //get the value of the user from the database by this process..
        req.user = user;

        next()


    } catch (error) {
        console.log("Error in protectRoute middleware",error);
        res.status(401).json({message : "Internal Server Error"})
        
        
    }

}