var express = require('express');
var router = express.Router();
var Users = require('../model/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// register users 
router.post("/register", async (req,res,next) => {
  try {
    var user = await Users.create(req.body);
    res.status(201).json({user});
  } catch (error) {
    next(error);
  }
})

// login users 
router.post("/login", async(req,res,next) => {
  var {email, password} = req.body;
  if(!email || !password) {
    res.status(401).json({error: "Email/Password is required"});
  }
  try {
    var user = await Users.findOne({email});
    if(!user) {
      return res.status(401).json({error : "Email is not register"});
    }
    var result = await user.verifypassword(password);
    if(!result) {
      return res.status(400).json({error : "Invaild Password"});
    }
    // generate token
  } catch (error) {
    next(error);
  }
})

module.exports = router;
