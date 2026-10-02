import mongoose from "mongoose";
import { DB_NAME } from "../constans.js";
const connectDb = async() => {
    try {
        const connectInitial = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`Data base successfully connected ||  Data Base HOST ${ connectInitial.connection.host}`)
    } catch (error) {
        console.log("Data base connection error in db file ", error)
        process.exit(1)
    }
}

export {connectDb}