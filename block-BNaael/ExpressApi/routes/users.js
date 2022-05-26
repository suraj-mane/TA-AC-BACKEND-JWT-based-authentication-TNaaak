var express = require('express');
var router = express.Router();
var User = require('../model/user');

var auth = require('../midlware/auth');

/* GET users listing. */
router.get('/', auth.verifytoken, function(req, res, next) {
  res.send('respond with a resource');
});

// user register

router.post('/register', async (req,res,next) => {
  try {
    var user = await User.create(req.body);
    var token = await user.signToken(token);
    res.status(200).json({user:user.userJSON(token)});
  } catch (error) {
    next(error);
  }
})

// user login 
router.post('/login', async (req,res,next) => {
  var {email,password} = req.body;
  if(!email || !password){
    res.status(401).json({error: "Email or Password is required"});
  }
  try {
    var user = await User.findOne({email});
    if(!user) {
      res.status(401).json({error: "Email is not register"});
    }
    var result = await user.passwordverify(password);
    if(!result){
      res.status(400).json({error: "Password is not match"});
    }
    var token = await user.signToken(token);
    res.json({user:user.userJSON(token)});
  } catch (error) {
    
  }
})

module.exports = router;
