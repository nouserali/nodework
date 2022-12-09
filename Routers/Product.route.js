import {imageUpload} from "../services/image.service.js"
import Express from "express"
import { create, GetAll, ProductList } from "../Controller/product.controller.js";
export const Product = Express.Router();

Product.route("/product/create").post(imageUpload.array('product_image',10),create);
Product.route("/product/list").get(ProductList);
