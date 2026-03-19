import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isAuth = async(req,res,next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Please login to access this resource"
            })
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Invalid token"
        })
    }
}

export default isAuth;