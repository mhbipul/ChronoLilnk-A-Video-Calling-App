import express from "express"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
    connectDB();
    
})
