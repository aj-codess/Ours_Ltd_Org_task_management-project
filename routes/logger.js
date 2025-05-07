import express from "express";
import logController from "./../controller/logController.js"

const logger=express.Router();

logger.post("/loginAsUser",(req,res)=>{
    logController.oldUser(req,res);
});

logger.post("/signupAsUser",(req,res)=>{
    logController.newUser(req,res);
});

logger.post("/loginAsAdmin",(req,res)=>{
    logController.oldAdmin(req,res);
});

logger.post("/signupAsAdmin",(req,res)=>{
    logController.newAdmin(req,res);
});

export default logger;