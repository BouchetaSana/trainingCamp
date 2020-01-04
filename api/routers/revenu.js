const express=require("express")
const router=express.Router()
const controller = require("../controllers")
const verifyToken= require('../helpers/authMiddleware')
router.post("/add",verifyToken,controller.addRevenu)
module.exports=router