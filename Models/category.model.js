import mongoose from "mongoose";

const CategoryShema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Active","Deactive"],
        default:"Active"
    },
    createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
})
const Category = mongoose.model("categories", CategoryShema);
export default Category;