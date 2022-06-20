var express = require('express');
var router = express.Router();

var auth = require('../midlware/auth');

router.get('/', auth.varifyToken, (req,res,next) => {
  res.json({msg : "This is a msg"});
})


module.exports = router;