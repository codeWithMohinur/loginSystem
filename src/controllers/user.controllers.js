import {AsyncHandler} from "../utils/AsyncHandlers.js"

const registerUser = AsyncHandler(async(req, res, next) => {
    const {fullName, userName, email, password} = req.body
    console.log("fullname" , fullName);
    console.log(req.body);
})

export {registerUser}