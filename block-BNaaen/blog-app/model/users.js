var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var userSchema = new schema({
    username:{type:String},
    email:{type:String, unique:true},
    password:{type:String},
    bio:{type:String},
    image:{type:String},
    followers:[{type:schema.Types.ObjectId, ref:"user"}],
    following:[{type:schema.Types.ObjectId, ref:"user"}]
},{timestamps:true})

userSchema.pre('save', async function(next) {
    if(this.password && this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

userSchema.methods.verifypassword = async function(password){
     var result = await bcrypt.compare(password, this.password);
     return result;
}

userSchema.methods.tokenverify = async function(){
    var payload = {userId: this.id, email:this.email};
    try {
        var token = jwt.sign(payload, "thisisapp");
        return token;
    } catch (error) {
        return error;
    }
}

userSchema.methods.userJSON = function(token){
    return {
        name: this.name,
        email: this.email,
        token:token
    }
}

module.exports = mongoose.model("user", userSchema);