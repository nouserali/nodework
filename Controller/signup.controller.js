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
    const checkOtp = await User.findOne({email:req.body.email,otp:req.body.otp})
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





