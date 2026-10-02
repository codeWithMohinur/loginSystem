import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema(
    {
        userName:{
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        fullName:{
            type: String,
            required: true,
            trim: true,
        },
        email:{
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password:{
            type: String,
            required: true,
            trim: true,
            unique: true
        },
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next;

    this.password = await bcrypt.hash(this.password, 10)
    next
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods,getAccessToken = function() {
    return jwt.sign(
        {
            _id : this._id,
            fullName : this.fullName,
            userName : this.userName,
            email : this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
        },
    )
}
userSchema.methods,getRefreshToken = function() {
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
        },
    )
}


export const User = mongoose.model("User", userSchema)