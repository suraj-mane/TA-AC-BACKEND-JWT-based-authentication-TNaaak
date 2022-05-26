var express = require('express');
var router = express.Router();
var User = require('../model/user');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// register user 
router.post('/register', async (req,res,next) => {
  try {
    var user = await User.create(req.body);
    var token = await user.singToken();
    res.status(200).json({user: user.userjson(token)})
  } catch (error) {
    next(error)
  }
})

// login user 
router.post('/login', async (req,res,next) => {
  var {email, password} = req.body;
  if(!email || !password) {
    res.status(400).json({error: "Email or Password is required"});
  }
  try {
    var user = await User.findOne({email});
    if(!user){
      res.status(400).json({error: "Email Not Register"});
    }
    var result = await user.verifypassword(password);
    if(!result){
      res.status(400).json({error: "Invaild Password"});
    }
    var token = await user.singToken();
    res.status(200).json({user: user.userjson(token)})
  } catch (error) {
    next(error);
  }
})


module.exports = router;
