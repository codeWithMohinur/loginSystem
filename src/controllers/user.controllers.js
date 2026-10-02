import {AsyncHandler} from "../utils/AsyncHandlers.js";
import {ApiError} from "../utils/ApiErrorHandler.js";
import {User} from "../models/user.model.js";
import {ApiResponse} from "../utils/ApiResponseHandler.js"
const registerUser = AsyncHandler(async(req, res, next) => {
    // get user data from frontend
    // validate that data
    // check user already exist or not
    // create a users object - create entry in db
    // removed password and refresh token in filed from response
    // check for user creation
    // return res

    const {fullName, userName, email, password} = req.body
    console.log(req.body)
    
    if(
        [fullName, userName, email, password].some((field) => field.trim() === "")
    ){
        throw new ApiError(404, "required all fields")
    }

    const existingUser = await User.findOne({
        $or: [{email}, {userName}]
    })

    if(existingUser){
        throw new ApiError(401, "User already exists")
    }

    const user = await User.create({
        fullName,
        userName : userName.toLowerCase(),
        email,
        password

    })

    const createUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createUser){
        throw new ApiError(500, "Something went wrong while create user")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(201, "user create successfully")
    )


})

export {registerUser}