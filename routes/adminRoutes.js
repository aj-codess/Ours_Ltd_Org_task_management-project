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

adminRouter.delete("/deleteTask",(req,res)=>{
    adminController.deleteTask(req,res);
});

adminRouter.get("/getTask",(req,res)=>{
    adminController.getTask(req,res);
});

adminRouter.post("/assignToTask",(req,res)=>{
    adminController.assignToTask(req,res);
});

adminRouter.put("/removeUserFromTask",(req,res)=>{
    adminController.removeUser(req,res);
});

export default adminRouter;