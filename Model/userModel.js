const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone:{
   type:String,
   require:true
  },
  password:{
   type:String,
   require:true
  },
  role:{
    type:String,
    enum:["USER","SELLER","ADMIN"],
    default:"USER"
 },
 image:{
  type:String,
  required:true,
}
},{
  timestamps:true
});
const usermodel=mongoose.model('demoProject',userSchema);
module.exports=usermodel
