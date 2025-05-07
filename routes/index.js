import express from "express";
import auth from "./../middleware/auth.js";
import logger from "./logger.js";
import userRouter from "./userRoutes.js";
import adminRouter from "./adminRoutes.js";

const router=express.Router();

router.use("/",auth);
router.use("/login",logger);
router.use("/user",userRouter);
router.use("/admin",adminRouter);

export default router;