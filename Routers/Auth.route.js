import Express from "express"
import {signup,login,OtpVerify, ResendOtp, ForgotPassword, ResetPassword, getAllUsers, update, deleteUser, getUsers} from '../Controller/signup.controller.js'
import { authentication } from "../middleware/authentication.js";
 const Auth = Express.Router();
Auth.route("/user/signup").post(signup)
Auth.route("/user/login").post(login)
Auth.route("/user/Verify").post(authentication,OtpVerify)
Auth.route("/user/resend-otp").post(ResendOtp);
Auth.route("/user/forgot-password").post(ForgotPassword);
Auth.route("/user/reset-password").post(ResetPassword);
Auth.route("/user/get-all-users").get(authentication,getAllUsers);
Auth.route("/user/get-users").get(authentication,getUsers);
Auth.route("/user/update").put(authentication,update);
Auth.route("/user/delete").delete(authentication,deleteUser);



export default Auth




