import Post from "../model/postModel.js"

export const  createPost = async(req,res,next)=>{
try{
    const posting = await Post.create(req.body);
    console.log(posting)
    return res.status(201).json(posting);

    next()
} catch(err) {
    console.log(err)
res.status(500).json({message:err.message})
}
}

export const DeletePost =async (req,res)=>{
  const {id}= req.params;
  
   const posting =await Post.findById(id);

  if(!posting){
   return  res.status(404).sned('post is not found');
  } 
  if(req.user.id !== posting.userRef){
    return res.status(401).send('youy can delte yor own post')
  }
  
try{
   await Post.findByIdAndDelete(id);
   res.status(200).json('post has delete');
  }catch(err) {
    console.log(err)
   res.status(404).json({message:err.message})
  }
}


export const updatePost =async (req,res)=>{
  const {id} = req.params;
    const posting = await Post.findById(id);
    if(!posting){
     return res.status(404).json('post is not found')
    }

  if(req.user.id !== posting.userRef){
  return  res.status(404).json('you can update your own post');
  }

  try{
    
    const updatepost = await Post.findByIdAndUpdate(id,req.body,{new:true});
  
    res.status(200).json(updatepost)
    }catch(err) {
     res.status(404).json({message:err.message});
    }
}

export const data =async (req,res)=>{
  try{
   const post = await Post.find();
   res.status(200).json(post)
  }catch(err) {
res.status(404).json({message:err.messag})
  }
}


export const Search =async (req,res)=>{
   try{
   const limit = parseInt(req.query.limit) || 9;
   const startIndex = parseInt(req.query.startIndex)||0;
   let offer = req.query.offer;
    
   if(offer === undefined || offer==="false"){
    offer = {$in:[false,true]}
   }
   let furnished = req.query.furnished;

   if(furnished===undefined || furnished==="false"){
    furnished = {$in:[true,false]}
   }
   let parking = req.query.parking;

   if(parking===undefined || parking==="false"){
    parking = {$in:[true,false]}
   }
   let type = req.query.type;

   if(type===undefined || type==="all"){
    type = {$in:['sale','rent']}
   }


   const SearchTerm = req.query.SearchTerm || '';

   const sort = req.query.sort || 'createdAt';
   const order = req.query.order || 'desc';


   const filterPost = await Post.find({
    name:{$regex:SearchTerm,$options:"i"},
    offer,
    furnished,
    parking,
    type,
   }).sort(
    {[sort]:order}
   )
   .limit(limit)
   .skip(startIndex);

   
   console.log(filterPost)
  return res.status(200).json(filterPost);
   }catch(err) {
 res.status(404).json({message:err.message});
   }
}