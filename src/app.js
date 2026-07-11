
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}));
app.use(cookieParser());

import healthRouter from "./routes/health.routes.js";
import userRouter from "./routes/user.routes.js";
import flightRouter from "./routes/flight.routes.js";
import bookingRouter from "./routes/booking.routes.js";
import paymentRouter from "./routes/payment.routes.js";



app.use("/api/v1/health",healthRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/flights",flightRouter);
app.use("/api/v1/bookings",bookingRouter);
app.use("/api/v1/payments",paymentRouter);


export {app};