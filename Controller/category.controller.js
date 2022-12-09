import Category from "../Models/category.model.js";

export const create = async (req, res) => {
   try {
      const isCateExist = await Category.findOne({name:req.body.name})
      if(isCateExist){
         res.send({
            status:false,
            msg:"Category already exist.",
            data:{}
         })
         return;
      }
      const create = await Category.create(req.body);
      res.send(create);
   } catch (err) {
      res.send({
         status: false,
         msg: "SOmething wrong with request.",
         data: err
      })
   }
}

export const GetAll = async(req,res) =>{
   try{
   const data = await Category.find({type:"Category"});
   if(data.length > 0){
      res.send({
         status:true,
         msg:"Data fetch successsfiully.",
         data:data
      })
   }else{
      res.send({
         status:false,
         msg:"Categories not found.",
         data:[]
      })
   }
}catch(err){
   res.send({
      status:false,
      msg:"SOmething wrong with request.",
      data:err
   })
}
}
