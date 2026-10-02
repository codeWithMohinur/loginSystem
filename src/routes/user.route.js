import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.middleware.js";
const route = Router();

route.route("/register").post(
    upload.none(),
    registerUser
)

export default route