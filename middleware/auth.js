import express from "express";
import logServices from "./../service/logService.js";

const auth=express.Router();

auth.use(async(req,res,next)=>{
    try{

        if (req.path=="/login" || req.path.startsWith("/login/")) {
            
            return next();
    
        };

        const authHeader = req.headers.authorization;

        const tokenFromHeader = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

        const tokenFromCookie = req.cookies?.token;

        const token = tokenFromHeader || tokenFromCookie;

        if(token){
            const decoded = await logServices.verifyToken(token);

            if(decoded){
                req.user = decoded.id;
                return next();
            };

                return res.status(401).json({error: "Unauthorized access"});
        };

        return res.status(401).json({error: "Unauthorized access"});

    } catch(error){
        console.error("Error in User Authentication middleware: ", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

export default auth;