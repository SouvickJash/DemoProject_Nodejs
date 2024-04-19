const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const cookiepurser = require("cookie-parser");
const flash = require('connect-flash')
const session = require('express-session')
const path = require('path')
const app = express();

app.use(cookiepurser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
//session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(flash())
app.set("view engine", "ejs");
app.set("Views", "Views");


app.use('/Uploads',express.static('Uploads')) 

const adminMiddleware = require('./Middleware/adminAuth')
app.use(adminMiddleware.jwtAuth)

//user route
const userRoute=require('./Router/userRoute');
app.use(userRoute);

//admin route
const AdminRoute=require('./Router/adminRoute')
app.use('/admin',AdminRoute)

//admin blog route
const BlogRoute=require('./Router/blogRoute')
app.use('/admin',BlogRoute);


// const auth = require("./Middleware/userAuth");
// app.use(auth.jwtAuth)





const PORT = 3000;
const dbDriver =
  "mongodb+srv://souvickjash9836:hahMNOgVnI9ioYbh@cluster0.3kynmom.mongodb.net/DEMO_PROJECT";
  mongoose.connect(dbDriver, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`server running port : http://localhost:${PORT}`);
      console.log(`Database connected successfully`);
    });
  })
  .catch((error) => {
    console.log(error);
  });