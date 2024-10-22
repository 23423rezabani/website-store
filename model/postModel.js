import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    descreaption:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    regularPrice:{
        type:Number,
        required:true
    },
    discountPrice:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    bathRooms:{
        type:Number,
        required:true
    },
    bedRooms:{
        type:Number,
        required:true
    },
    furnished:{
        type:Boolean,
        required:true
    },
    parking:{
        type:Boolean,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    offer:{
        type:Boolean,
        required:true
    },
    imageUrls:{
        type:Array,
        required:true
    },
    userRef:{
        type:String,
        required:true,
    },


},{timestamps:true});

const Post = mongoose.model('Post',postSchema);

export default Post;

