import express from "express";
import adminController from "./../controller/adminController.js";

const adminRouter=express.Router();

//gets admins profile
adminRouter.get("/",(req,res)=>{
    adminController.getUser(req,res);
});

adminRouter.get("/users",(req,res)=>{
    adminController.getUsers(req,res);
});

adminRouter.post("/",(req,res)=>{
    adminController.updateProfile(req,res);
});

adminRouter.delete("/",(req,res)=>{
    adminController.deleteAccount(req,res);
});

adminRouter.post("/createTask",(req,res)=>{
    adminController.createTask(req,res);
});

export default adminRouter;