var express = require('express');
var router = express.Router();
var Book = require('../model/book');
var Comment = require('../model/comment');

// Edit Comment
router.post('/:id/edit', (req,res,next) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, (err,comment) =>{
    if(err) return next(err);
    res.status(200).json(comment);
  })
})

// delete comment 
router.get('/:id/delete', (req,res,next) => {
  var id = req.params.id;
  Comment.findByIdAndDelete(id, (err,comment) => {
    if(err) return next(err);
    res.status(200).json(comment);
  })
})

module.exports = router; 