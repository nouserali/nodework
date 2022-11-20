import express from "express";
import fs from "fs";
import connectDB from "./config/db.js"
import {Auth} from "./Routers/Auth.route.js"

const app = express()
app.use(express.json())
connectDB();
app.use(Auth)
app.listen(process.env.PORT || 4000,(request,response) =>{
    console.log("Yes your server connected with PORT:3002");
})
