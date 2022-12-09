import express from "express";
import fs from "fs";
import Auth from "./Routers/Auth.route.js"
import connectDB from "./config/db.js"
import { config } from 'dotenv';
import Category from "./Routers/Category.route.js";
import { Product } from "./Routers/Product.route.js";

config();
const app = express()
app.use(express.json())
connectDB();
app.use(Auth);
app.use(Category);
app.use(Product);



app.listen(process.env.PORT || 4000,(request,response) =>{
    console.log("Yes your server connected with nouser PORT:3002");
})