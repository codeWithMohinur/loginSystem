import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.middleware.js";
const route = Router();

route.route("/register").post(
    upload.none(),
    registerUser
)
route.route("/login").post(loginUser)
export default route