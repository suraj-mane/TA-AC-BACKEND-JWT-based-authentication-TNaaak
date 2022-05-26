var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");

var userSchema = new schema({
  name:{type:String},
  email:{type:String, required:true, unique:true},
  password:{type:String}
}, {timestamps:true});

userSchema.pre('save', async function(next) {
  if(this.password && this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})

userSchema.methods.verifypassword = async function(password){
  try {
    var result = await bcrypt.compare(password, this.password);
    console.log(result);
    return result;
  } catch (error) {
    return result;
  }
}

userSchema.methods.signToken = async function() {
  var payload = {userId: this.id, email:this.email};
  try {
    let token = await jwt.sign(payload, process.env.secret);
    return token;
  } catch (error) {
    return error
  }
}

userSchema.methods.userJSON = function(token){
  return {
    name: this.name,
    email: this.email,
    token: token
  }
}
module.exports = mongoose.model("user", userSchema);