import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.middleware.js";
import { validJWT } from "../middlewares/auth.middleware.js"
const route = Router();

route.route("/register").post(
    upload.none(),
    registerUser
)
route.route("/login").post(loginUser)

route.route("/logout").post(
    validJWT,
    logoutUser
)
export default route