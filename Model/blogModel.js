const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  subtitle:{
   type:String,
   require:true
  },
  write_blog:{
   type:String,
   require:true
  },
//   role:{
//     type:String,
//     enum:["USER","SELLER","ADMIN"],
//     default:"USER"
//  },
 image:{
  type:String,
  required:true,
},
status: {
  type: Boolean,
  default: false
},
},{
  timestamps:true
});
const usermodel=mongoose.model('userblog',userSchema);
module.exports=usermodel
