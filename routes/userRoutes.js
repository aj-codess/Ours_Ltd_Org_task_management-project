import express from "express";
import userController from "./../controller/userController.js";

const userRouter=express.Router();

userRouter.get("/",(req,res)=>{
    userController.getUser(req,res);
});

userRouter.post("/",(req,res)=>{
    userController.updateProfile(req,res);
});

userRouter.delete("/",(req,res)=>{
    userController.deleteAccount(req,res);
});

export default userRouter;