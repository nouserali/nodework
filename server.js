import express from "express";
import fs from "fs";
import Auth from "./Routers/Auth.route.js"
import connectDB from "./config/db.js"
import { config } from 'dotenv';

config();
const app = express()
app.use(express.json())
connectDB();
app.use(Auth);

app.listen(process.env.PORT || 4000,(request,response) =>{
    console.log("Yes your server connected with nouser PORT:3002");
})