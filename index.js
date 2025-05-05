import dotenv from "dotenv";
import express from 'express';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app=express();

const PORT=process.env.PORT || 3000;

dotenv.config();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const server=app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);

});