import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js"
import cookieParser from "cookie-parser";



const app = express();
dotenv.config();


mongoose.connect(process.env.MONGODB_URL)

.then(()=>{
    app.listen(3000,()=>{
        console.log('connected to server')
    })
}).catch((err)=>{
  console.log(err)
})

app.use(express.json());
app.use(cookieParser());

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes)