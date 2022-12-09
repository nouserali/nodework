import Express from "express"
import { create, GetAll } from "../Controller/category.controller.js";
const Category = Express.Router();

Category.route("/category/create").post(create);
Category.route("/category/list").get(GetAll);

export default Category