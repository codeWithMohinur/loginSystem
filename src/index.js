import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDb } from "./db/index.db.js";
dotenv.config({
    path: "./.env"
})

connectDb()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`server running on this port ${process.env.PORT}`)
    })
})

.catch((error) => {
    console.log("Data base connection error in server site ", error)
})