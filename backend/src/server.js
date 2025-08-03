import express from "express"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();


const app = express();
const PORT = process.env.PORT

app.use(cors({
    origin: "http://localhost:5173",
    credentials : true // allow frontend to send the cookies
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use('/api/chat',chatRoutes)

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
    connectDB();
    
})
