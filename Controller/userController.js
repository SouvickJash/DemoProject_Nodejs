const UserModel = require("../Model/userModel");
const userBlog = require("../Model/blogModel");
const bcriypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const flash = require('connect-flash')


//index
const index = async(req, res) => {
  let blog=await userBlog.find().sort({createdAt:-1})
  res.render("index",{
    title:"Home",
    blog:blog,
    data: req.user
  });
};
//about
const about = (req, res) => {
  res.render("about", {
    title: "About",
    data: req.user
  });
};
//blog
const blog = (req, res) => {
  res.render("blog", {
    title: "Blog",
    data: req.user
  
  });
};

//user write blog
const createBlog = async (req, res) => {
  console.log(req.body)
  try {
    const { title, author, subtitle, write_blog } = req.body;
   
    const newBlog = new userBlog({
      title,
      author,
      subtitle,
      write_blog,
    });
    if (req.file) {
      newBlog.image = req.file.path;
    }
    const result = await newBlog.save();
    if (result) {
      res.redirect("/");
      
    } else {
      console.log("blog not added");
    }
  } catch (error) {
    console.log(error);
  }
};
//blog details
const blogDetails=async(req,res)=>{
  try{
    const id=req.params.id;
    const image = req.file;
    let data=await userBlog.findById(id)
    if(data){
      res.render('blogdetails',{
        title:"Blogdetails page",
        result:data
      })
    }else{
      res.redirect("/");
    }
  }
  catch(error){
    conosle.log(error)
  }
}



//contact
const contact = (req, res) => {
  res.render("contact", {
    title: "Contact",
    data: req.user
  });
};
//register view
const registerView = (req, res) => {
  res.render("userRegister", {
    title: "Register",
    data: req.user,
    message: req.flash("message"),
  });
};
//register
const userRegister = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            req.flash('message', 'user already exists. please login!')
            res.redirect('/register')
        }
    const user = new UserModel({
      name,
      email,
      phone,
      password: bcriypt.hashSync(req.body.password, bcriypt.genSaltSync(10)),
    });
    if (req.file) {
      user.image = req.file.path;
    }
    const result = await user.save();
    if (result) {
      req.flash('message', 'Register Successfully')
      res.redirect("/login");
    } else {
      // res.redirect('/register')
      console.log("user not added");
    }
  } catch (error) {
    req.flash('message', 'Register error')
    console.log(error);
  }
};

//login view
const loginView = (req, res) => {
  res.render("userLogin", {
    title: "Login",
    data: req.user,
    message: req.flash("message"),
  });
};
//login
const userLogin = async (req, res) => {
  try {
    const data = await UserModel.findOne({
      email: req.body.email,
    });
    if (data) {
      const pwd = data.password;
      if (bcriypt.compareSync(req.body.password, pwd)) {
        const token = jwt.sign(
          {
            id: data._id,
            name: data.name,
            phone: data.phone,
            email: data.email,
            image: data.image,
          },
          "webskitters12345",
          { expiresIn: "10m" }
        );
        res.cookie("userToken", token);
        res.redirect("/");  //redirect home
      } else {
        console.log("password noot match");
        res.redirect("/login");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//dashboard view
const dashboard = (req, res) => {
  res.render("userDashboard", {
    title: "Dashboard",
    data: req.user,
  });
};
//auth check
const authCheck = (req, res, next) => {
  if (req.user) {
    console.log(req.user);
    next();
  } else {
    console.log("error");
    res.redirect("/login");
  }
};
//logout
const logout = (req, res) => {
  res.clearCookie("userToken");
  res.redirect("/login");
};

module.exports = {
  index,
  about,
  blog,
  blogDetails,
  createBlog,
  contact,
  registerView,
  userRegister,
  loginView,
  userLogin,
  dashboard,
  authCheck,
  logout,
};
