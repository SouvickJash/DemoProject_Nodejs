const express=require('express');
const { loginView, adminLogin, AdminDashboard, adminAuthCheck, Logout, adminUser} = require('../Controller/adminController');
const { jwtAuth } = require('../Middleware/userAuth');
const Router=express.Router();

Router.get('/login',loginView);
Router.post('/create/login',adminLogin);
Router.get('/dashboard',jwtAuth,adminAuthCheck,AdminDashboard);
Router.get('/user',jwtAuth,adminAuthCheck,adminUser)
Router.get('/logout',jwtAuth,adminAuthCheck,Logout)



module.exports=Router