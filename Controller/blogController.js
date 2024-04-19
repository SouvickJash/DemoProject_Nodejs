const blogModel=require('../Model/blogModel');

//admin get blogs
const getBlogDetais=async(req,res)=>{
   try{
     const getBlog= await blogModel.find()
     res.render('Admin/post',{
      title: 'Admin | Blog',
      data: req.admin,
      data: getBlog
   
     })

   }
   catch(error){
      console.log(error)
   }
}

//adminAuthCheck middlewarwe
const adminAuthCheck = (req, res, next) => {
   if (req.admin) {
     next();
   } else {
     res.redirect("/admin/login");
   }
 };

module.exports={
   getBlogDetais,
   adminAuthCheck,
}