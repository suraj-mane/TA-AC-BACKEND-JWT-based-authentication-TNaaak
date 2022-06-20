var express = require('express');
var router = express.Router();
var User = require('../model/users');
var auth = require('../midlware/auth');

 // curent user 
 router.get('/', auth.varifyToken, async (req,res,next) => {
    var _id = req.user.userId;
    var user = await User.findOne({_id});
    res.status(200).json({user}); 
 }) 

 // user update 
 router.post('/', async (req,res,next) => {
     var _id = req.user.userId;
     try {
      var user = await User.findByIdAndUpdate(_id, req.body);
      res.status(200).json({user});
     } catch (error) {
        next(error);
     }
 })

module.exports = router;