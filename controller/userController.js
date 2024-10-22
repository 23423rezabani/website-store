import Post from "../model/postModel.js";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";



export const test =  (req,res)=>{
   res.send('hello world');
}

export const  updateUser =async(req,res)=>{
if(req.user.id !==req.params.id)return res.status(401).send('you can only updata your own ')

try{
if(req.body.password){
   req.body.password = await bcrypt.hash(req.body.password,10)
}
const userUpdate = await User.findByIdAndUpdate(req.params.id,{
   $set:{
      firstName:req.body.firstName,
      email:req.body.email,
      password:req.body.password
   }
},{new:true});


res.status(200).json(updateUser)
console.log(userUpdate)
}catch(err) {
   
   res.status(500).json({ message: err.message }); 
};



} 

export const deleteUser = async (req,res)=>{
  if(req.user.id !== req.params.id) {
     res.status(404).send('you can delete your own account');
  }
  try{
  const userDelete = await User.findByIdAndDelete(req.params.id);
  if (!userDelete) {
   return res.status(404).json({ message: 'User not found.' });
 }
 
 res.clearCookie('access_token'); 

  res.status(201).json(userDelete);
  
  }catch(err){
  res.status(404).json({message:err.message})
  }

  
}







export const getPost = async (req,res)=>{
  if(req.user.id === req.params.id){
   try{
      const userPost = await Post.find({userRef:req.params.id})
    res.status(201).json(userPost);
    
   }catch(err) {
    console.log(err)
     res.status(501).json({message:err.message});
   }
  }else{
   return res.status(401).send('you can only vist yout post')
  }
  
}