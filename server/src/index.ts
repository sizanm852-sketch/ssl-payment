import express from "express";
import type { Express,Request,Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import { connectDB } from "./db/db";

const port = process.env.PORT;

const app:Express = express();
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

//connect database
connectDB();

// Server listen
app.listen(port, ():void => {
    console.log(`Server started on port http://localhost:${port}`);
});

import paymentRouter from "./route/payment.route";

app.use("/api/payment", paymentRouter);

app.get("/",(req:Request,res:Response):void => {
    res.json("Welcome to our payment gateway");
});

