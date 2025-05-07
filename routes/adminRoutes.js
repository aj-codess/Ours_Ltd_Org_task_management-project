import express from "express";
import adminController from "./../controller/adminController.js";

const adminRouter=express.Router();

//gets admins profile
adminRouter.get("/",(req,res)=>{
    userController.getUser(req,res);
});

adminRouter.post("/",(req,res)=>{
    userController.updateProfile(req,res);
});

adminRouter.delete("/",(req,res)=>{
    userController.deleteAccount(req,res);
});

export default adminRouter;