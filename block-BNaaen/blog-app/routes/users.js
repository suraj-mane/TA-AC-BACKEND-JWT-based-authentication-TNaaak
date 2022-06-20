var express = require('express');
var router = express.Router();
var User = require('../model/users');
var auth = require('../midlware/auth');

/* GET users listing. */
//user info
router.get('/', async function(req,res,next)  {
  try {
    var user = await User.find();
    res.status(200).json({user});
  } catch (error) {
    next(error);
  }
})

// users register
router.post('/', async function(req, res, next) {
  try {
    var user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// users login
router.post("/login", auth.varifyToken, async (req,res,next) => {
  var {email, password } = req.body;
  if(!email || !password) {
    res.status(400).json({error: "Email or Password is required"});
  }
  try {
    var user = await User.findOne({email});
  if(!user){
    res.status(400).json({error: "Email is not register"});
  }
  var result = await user.verifypassword(password);
  if(!result){
    res.status(400).json({error:"Invaild Password"});
  }
  var token = await user.tokenverify();
  res.status(200).json({user: user.userJSON(token)})
  } catch (error) {
    next(error);
  }
})

module.exports = router;
