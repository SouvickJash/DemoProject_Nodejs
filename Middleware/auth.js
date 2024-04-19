const bcrypt=require('bcryptjs')

//compare password
const comparePassword = async (password, hashPassword) => {
   return bcrypt.compare(password, hashPassword);
 };
 module.exports={
   comparePassword
 }