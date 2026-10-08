import {AsyncHandler} from "../utils/AsyncHandlers.js";
import {ApiError} from "../utils/ApiErrorHandler.js";
import {User} from "../models/user.model.js";
import {ApiResponse} from "../utils/ApiResponseHandler.js"
import jwt from "jsonwebtoken";
const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.getAccessToken()
        const refreshToken = user.getRefreshToken()


        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {refreshToken, accessToken}
        
    } catch (error) {
        console.log("TOKEN ERROR:", error);
        throw new ApiError(
            500,
            "Something went wrong while generate access and refresh token"
        );
    }
};
const registerUser = AsyncHandler(async(req, res, next) => {
    // get user data from frontend
    // validate that data
    // check user already exist or not
    // create a users object - create entry in db
    // removed password and refresh token in filed from response
    // check for user creation
    // return res

    const {fullName, userName, email, password} = req.body
    
    
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


});

const loginUser = AsyncHandler(async (req, res) => {

    // get login data from frontend
    // validate data
    // find user using email or username
    // check password
    // generate access and refresh token
    // remove password and refresh token from response
    // return response

    const { userName, email, password } = req.body;

    console.log(req.body);

    // Validate required fields
    if (
        [userName, email, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // Find user using email OR username
    const user = await User.findOne({
        $or: [{ email }, { userName }]
    });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // Check password
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "password is wrong please enter a valid password");
    }

    // Generate tokens
     const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(
        200,
        {
            user: loggedInUser, accessToken, refreshToken
        },
        "User login is successfully"
    )
  )

});

const logoutUser = AsyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken" , options)
    .clearCookie("refreshToken" , options)
    .json(
        new ApiResponse(200, {}, "User is successfully logout")
    )
});

const refreshAccessToken = AsyncHandler(async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id)
        if(!user){
            throw new ApiError(401, "unauthorized request for token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "refresh token already use")
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(decodedToken._id)
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        return res
        .status(200)
        .cookie("accessToke", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken, refreshToken: newRefreshToken
                },
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiResponse(401, error?.message || "Something went wrong while refresh their access token")
    }
});

export { 
    registerUser, 
    loginUser,
    logoutUser,
    refreshAccessToken
};
