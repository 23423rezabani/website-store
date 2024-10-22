import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";


export const register = async(req,res)=>{
 const {firstName,lastName,email,password}=req.body;

 console.log(req.body)
try{
  const userExist = await User.findOne({email});

  if(userExist){
    res.status(409).send('this email already register');
  }
 const hashPassword = await bcrypt.hash(password,10);
 
 const user =new User({
    firstName,
    lastName,
    email,
    password:hashPassword,
 });
 
 await user.save();
 
 res.status(201).json('email save successfully')
 
}catch(err) {
res.status(404).json({massage:err.massage})
}
 
}


export const login = async (req,res)=>{
  const {email,password} = req.body;

  console.log(req.body);
  
  
  try{
    const user = await User.findOne({email});
    
    if(!user){
      res.status(404).send('this email not in database');
    }

    const isMatch =  bcrypt.compare(user.password,password);
    if(!isMatch){
      res.status(404).send('email or password is wrong')
    }
    const token = JWT.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'1d'});

    res.cookie('access_token',token,{httpOnly:true});
    res.status(201).json(user);
  }catch(err) {
   res.status(404).json({massage:err.massage})
  }
}