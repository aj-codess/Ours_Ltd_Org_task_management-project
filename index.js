import dotenv from "dotenv";
import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/db_config.js";
import router from "./routes/index.js";
import logService from "./service/logService.js";

const app=express();

logService.writePublicPrivate();
logService.loadKeyToMemory();

const PORT=process.env.PORT || 3000;

dotenv.config();

db.connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000"],
    })
  );

app.use("/api/v1",router);

const server=app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);

});