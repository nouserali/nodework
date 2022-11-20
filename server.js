import express from "express";
import fs from "fs";
import Router from "./Routers/Auth.route.js"
import connectDB from "./config/db.js"
import { config } from 'dotenv';

config();
const app = express()
app.use(express.json())
connectDB();
app.use(Router);

app.listen(process.env.PORT || 3002,(request,response) =>{
    console.log("Yes your server connected with PORT:3002");
})