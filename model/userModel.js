import mongoose from "mongoose";
import { Schema } from "mongoose";


const userSchema =new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"first name should not empty"]
    },
    lastName:{
        type:String,
        required:[true,"lastName name should not empty"]
    },
    email:{
        type:String,
        required:[true,'email should not expty'],
     
    },
    password:{
        type:String,
        required:[true,'password should not expty'],
        min:8,
        max:30 
    }

})

const User = mongoose.model('User',userSchema);

export default User;