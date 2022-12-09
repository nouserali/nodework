import User from "../Models/user.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from 'otp-generator'

export const signup = async (req, res) => {
    try{
    let IsEmailExist = await User.findOne({ email: req.body.email })
    let IsMobileExist = await User.findOne({ mobile: req.body.mobile })
    if (IsEmailExist) {
        res.send({
            status: 'false',
            massagge: 'Email Already Exist',
            data: {}
        })
    } else {
        if (IsMobileExist) {
            res.send({
                status: 'false',
                massage: 'Mobile number Already Exist',
                data: {}
            })
        }
        else {
            var otp = Math.floor(1000 + Math.random() * 9000);
            const hash = bcrypt.hashSync(req.body.password, 10);
            req.body.password=hash
            req.body.otp=otp
            let Users = await User.create(req.body)
            Users.token= await jwt.sign({time:Date(), user_id: Users._id,},'Coachinge')

            res.send({
                status: 'true',
                massagge: 'User Sigup Successfully',
                data: Users
            })
        }
    }
} catch (err){
    res.status(500).send({
       status:false,
       msg:"Something wrong with request.",
       data:err
    })
 }
}

export const login = async (req, res) => {
    try{
        let IsEmailExist = await User.findOne({ email: req.body.email })
        if(IsEmailExist){
           let getUserData=await User.findOne({ email: req.body.email })
           let checkPass = await bcrypt.compare(req.body.password,getUserData.password)
           if(checkPass){
            getUserData.token= await jwt.sign({time:Date(), user_id: getUserData._id,},'Coachinge')
            res.send({
                status: 'true',
                massagge: 'User login Successfully',
                data: getUserData
            })

           }else{
            res.send({
                status: 'false',
                massagge: 'Password worng!',
                data: {}
            })
           }

        }else{
            res.send({
                status: 'false',
                massagge: 'Email Not Eixts',
                data: {}
            })
        }

    }
    catch (err){
        res.status(500).send({
           status:false,
           msg:"Something wrong with request.",
           data:err
        })
     }


}

export const OtpVerify = async (req, res) => {
    const checkOtp = await User.findOne({otp:req.body.otp})
    const checkEmail = await User.findOne({email:req.body.email})
    if(checkEmail){
    if(checkOtp){
         var dataToBeUpdate = {};
         dataToBeUpdate.email_verified = true;
         await User.findByIdAndUpdate({_id:checkOtp._id},dataToBeUpdate)
         checkOtp.email_verified = true;
         res.send({
            status:true,
            msg:"Otp Verified succesfully.",
            data:checkOtp
         });return;
      }else{
         res.send({
            status:false,
            msg:"Invalid Otp given.",
            data:{}
         });return;
      }
    }else{
        res.send({
            status:false,
            msg:"Invalid Email given.",
            data:{}
         });return; 
    }
}

export const ResendOtp = async(req,res) =>{
    console.log('req',req)
    try{
       var otp = Math.floor(1000 + Math.random() * 9000);
       req.body.otp = otp;
       const data = await User.findOneAndUpdate({email:req.body.email},req.body)
       if(data){
          res.send({
             status:true,
             msg:"Otp resend successfully.",
             data:{otp}
          })
       }else{
          res.send({
             status:false,
             msg:"data not found with given id",
             data:{}
          })
       }
    }catch(err){
       res.send({
          status:false,
          msg:"Something went wrong with request.",
          data:{}
       })
    }
}
export const ForgotPassword = async(req,res) =>{
    console.log('req',req)
    try{
       var otp = Math.floor(1000 + Math.random() * 9000);
       req.body.otp = otp;
       const data = await User.findOneAndUpdate({email:req.body.email},req.body)
       if(data){
          res.send({
             status:true,
             msg:"Otp resend successfully.",
             data:{otp}
          })
       }else{
          res.send({
             status:false,
             msg:"Email not Exist",
             data:{}
          })
       }
    }catch(err){
       res.send({
          status:false,
          msg:"Something went wrong with request.",
          data:{}
       })
    }
}

export const ResetPassword = async(req,res) =>{
    const checkUserExist = await User.findOne({email:req.body.email})
    console.log("checkUserExist++++++++",checkUserExist)
    if(checkUserExist){
             var dataToBeUpdate = {};
             const passwordHash = await bcrypt.hash(req.body.password,10)
             dataToBeUpdate.password = passwordHash;
             await User.findByIdAndUpdate({_id:checkUserExist._id},dataToBeUpdate)
          res.send({
             status:true,
             msg:"Password Reset Succesfully",
             data:checkUserExist
          })
      
    }else{
       res.send({
          status:false,
          msg:"User not found with given ID.",
          data:{}
       });return;
    }
 }

 export const getAllUsers = async(req,res) =>{
   // console.log('req======',req)
   var where  = {}
   if(req.query.email){
     where.email = req.query.email
   }
   if(req.query.username){
      where.username = req.query.username
   }
   const data = await User.find(where)
   if(data.length > 0){
      res.send({
         status:true,
         msg:"User data fetch successfully.",
         data:data
      })
   }else{
      res.send({
         status:false,
         msg:"No data found",
         data:[]
      })
   }
   res.send(data)
}
export const getUsers = async(req,res) =>{
   var where  = {}
   if(req.query.email){
     where.email = req.query.email
   }
   if(req.query.username){
      where.username = req.query.username
   }
   const data = await User.find(where)
   if(data.length > 0){
      res.send({
         status:true,
         msg:"User data fetch successfully.",
         data:data
      })
   }else{
      res.send({
         status:false,
         msg:"No data found",
         data:[]
      })
   }
   res.send(data)
}
export const update = async(req,res) =>{
   try{
   const data = await User.findByIdAndUpdate({_id:req.body.id},req.body)
   if(data){
      res.send({
         status:true,
         msg:"update successfully.",
         data:{}
      })
   }else{
      res.send({
         status:false,
         msg:"data found with given id or something wrong with update",
         data:{}
      })
   }
}catch(err){
   res.send({
      status:false,
      msg:"data found with given id or something wrong with update",
      data:{}
   })
}
}


export const deleteUser = async(req,res) =>{
   try{
   const data = await User.findByIdAndDelete({_id:req.body.id})
   if(data){
      res.send({
         status:true,
         msg:"Deleted successfully.",
         data:{}
      })
   }else{
      res.send({
         status:false,
         msg:"data found with given id",
         data:{}
      })
   }
}catch(err){
   res.send({
      status:false,
      msg:"Something wrong with request.",
      data:{}
   })
}
}

 





