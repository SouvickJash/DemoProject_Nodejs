const express=require('express');
const { getBlogDetais,adminAuthCheck  } = require('../Controller/blogController');
const { jwtAuth } = require('../Middleware/userAuth');

const router=express.Router();

router.get('/post',jwtAuth,adminAuthCheck,getBlogDetais)

module.exports=router