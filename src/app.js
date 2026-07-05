import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import healthRouter from "./routes/health.routes.js";

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}));
app.use(cookieParser());
app.use("/api/v1/health",healthRouter);


export {app};