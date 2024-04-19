const { comparePassword } = require("../Middleware/auth");
const AdminModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const flash = require('connect-flash')

//admin loginView
const loginView = (req, res) => {
  res.render("Admin/adminLogin", {
    title: "adminLogin",
    message: req.flash("message"),
  });
};

//admin login
const adminLogin = async (req, res) => {
  console.log(req.body);
  try {
    const data = await AdminModel.findOne({
      email: req.body.email,
    });
    if (data) {
     
      if (data.role == "ADMIN") {
        const password = req.body.password;
        const passwordMatch = await comparePassword(password, data.password);

                if (!passwordMatch) {
                    req.flash('message', "Incorrect password.");
                    console.log('Password does not match.');
                    return res.redirect('/admin/login');
                };

    
        
          const token = jwt.sign(
            {
              _id: data._id,
              name: data.name,
              email: data.email,
              phone: data.phone,
            },
            "souvikjash1234",
            { expiresIn: "1d" }
          );
          if (token) {
            res.cookie('adminToken', token);
            req.flash('message',"Login in successfully")
            return res.redirect('/admin/dashboard');
        } else {
            return res.redirect('/admin/login');
        }
      
    }else{
      return res.redirect('/admin/login');
    }
  } }catch (error) {
    console.log(error);
  }
};

//total user 
const adminUser=async(req,res)=>{
  try{
     const getUser=await AdminModel.find().sort({createdAt:-1})
     res.render('Admin/user',{
     title:"Admin | User",
    //  data:req.admin,
     data:getUser
     })
  }
  catch(error){
    console.log(error)
  }
} 

//admin dashboard
const AdminDashboard = (req, res) => {
  console.log(req.admin);
  res.render('Admin/adminDashboard',{
    title:"Admin | Dashboard",
    data: req.admin,
  });
};

//adminAuthCheck middlewarwe
const adminAuthCheck = (req, res, next) => {
  if (req.admin) {
    next();
  } else {
    res.redirect("/admin/login");
  }
};

// logout
const Logout = (req, res) => {
   res.clearCookie('adminToken')
   res.redirect('/admin/login')
 }

module.exports = {
  loginView,
  adminLogin,
  AdminDashboard,
  adminUser,
  adminAuthCheck,
  Logout
};
