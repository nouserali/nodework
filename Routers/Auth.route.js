import Express from "express"
import {signup,login,OtpVerify} from '../Controller/signup.controller.js'
import { authentication } from "../middleware/authentication.js";
 const Auth = Express.Router();
Auth.route("/user/signup").post(signup)
Auth.route("/user/login").post(login)
Auth.route("/user/Verify").post(authentication,OtpVerify)

export default Auth




