import Express from "express"
import {signup,login,OtpVerify, ResendOtp, ForgotPassword, ResetPassword} from '../Controller/signup.controller.js'
import { authentication } from "../middleware/authentication.js";
 const Auth = Express.Router();
Auth.route("/user/signup").post(signup)
Auth.route("/user/login").post(login)
Auth.route("/user/Verify").post(authentication,OtpVerify)
Auth.route("/user/resend-otp").post(ResendOtp);
Auth.route("/user/forgot-password").post(ForgotPassword);
Auth.route("/user/reset-password").post(ResetPassword);



export default Auth




