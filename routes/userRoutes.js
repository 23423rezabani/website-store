import express from "express";
import { deleteUser, getPost, test, updateUser } from "../controller/userController.js";
import { VerifyToken } from "../utils.js";

const router = express.Router();

router.get('/test',test)
router.post('/updateUser/:id',VerifyToken,updateUser);
router.delete('/delete/:id',VerifyToken,deleteUser);
router.get('/getPost/:id',VerifyToken,getPost);


export default router;
