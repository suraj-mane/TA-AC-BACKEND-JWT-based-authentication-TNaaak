var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var userSchema = new schema({
  name:{type:String},
  email:{type:String},
  password:{type:String}
}, {timestamps:true});


userSchema.pre('save', async function(next){
  if(this.password && this.isModified('password')){
    this.password = await  bcrypt.hash(this.password, 10);
  }
  next();
})

userSchema.methods.passwordverify = async function(password){
  try {
    var result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    return error;
  }
}

userSchema.methods.signToken = async function() {
  var payload = {userId: this.id, email:this.email};
  try {
    var token = await jwt.sign(payload, "thisisapp");
    return token;
  } catch (error) {
    return error;
  }
}

userSchema.methods.userJSON = function(token){
  return {
    name: this.name,
    email:this.email,
    token: token
  }
}

module.exports = mongoose.model("user", userSchema);
