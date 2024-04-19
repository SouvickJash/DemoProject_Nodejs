const express = require("express");
const { registerView, index, about, contact, loginView, blog, userRegister, userLogin, dashboard, authCheck, logout, createBlog, blogDetails } = require("../Controller/userController");
const userAuth=require('../Middleware/userAuth')
const upload=require('../Utiliti/userImage')
const router = express.Router(); 

router.use(userAuth.jwtAuth)
router.get("/", index);
router.get("/about", about);
router.get('/contact',contact);
router.get('/blog',[userAuth.jwtAuth],authCheck,blog);
router.post('/blog/create',upload.single('image'),createBlog);
router.get('/blogdetails/:id',blogDetails);

router.get("/register", registerView);
router.post('/register/create',upload.single('image'),userRegister);
router.get('/login',loginView);
router.post('/login/create',userLogin);
router.get('/dashboard',[userAuth.jwtAuth],authCheck,dashboard);
router.get('/logout',[userAuth.jwtAuth],authCheck,logout)


module.exports = router;
