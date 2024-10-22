import express from "express";
import { createPost ,data,DeletePost, Search, updatePost } from "../controller/postController.js";
import { VerifyToken } from "../utils.js";
const router = express.Router();

router.post('/createPost',VerifyToken,createPost);
router.post('/update/:id',VerifyToken,updatePost)
router.delete('/delete/:id',VerifyToken,DeletePost);
router.get('/getData',data);
router.get('/getSearch',VerifyToken,Search);

export default router;