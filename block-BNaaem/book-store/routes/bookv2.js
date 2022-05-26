var express = require('express');
var router = express.Router();
var Book = require('../model/book');
var Comment = require('../model/comment');

/* GET home page. */
router.get('/', function(req, res, next) {
  Book.find({}, (err,books) =>{
    if(err) return next(err);
    res.status(200).json({book})
  })
});

// get single book 
router.get('/:id',(req,res,next) => {
  var id = req.params.id;
  Book.findById(id, (err,book) => {
    if(err) return next(err);
    res.status(200).json({book})
  })
})

// Create book 
router.post('/', (req,res,next) => {
  req.body.cartgory = req.body.cartgory.split();
  Book.create(req.body, (err,book) => {
    if(err) return next(err);
    res.status(200).json({book});
  })
})

// Update book 
router.post('/:id', (req,res,next) => {
  var id = req.params.id;
  Book.findByIdAndUpdate(id,req.body,(err,book) => {
    if(err) return next(err);
    res.status(200).json({book})
  })
})

// delete book 
router.get('/:id', (req,res,next) => {
  var id = req.params.id;
  Book.findByIdAndDelete(id, (err,book) => {
    if(err) return next(err);
    res.status(200).json({book})
  })
})

// Add comment 
router.post('/:id/comment', (req,res,next) => {
  var id = req.params.id;
  req.body.bookId = id;
  Comment.create(req.body, (err,comment) => {
    if(err) return next(err);
    Book.findByIdAndUpdate(id, {$push:{commentId:comment._id}}, (err,book) => {
      if(err) return next(err);
      res.status(200).json({book});
    })
  })
})

// list cartgory 
router.get("/list", (req,res,next) => {
  var allCartgory = Book.distinct("cartgory");
  res.status(200).json({allCartgory});
})

// count books for each category
router.get("/listbook", (req,res,next) => {
  var cartgory = req.query;
  Book.find({cartgory:cartgory},(err,result) => {
    res.status(200).json({result});
  })
})

// list author 
router.get("/listauthor", (req,res,next) => {
  var allAuthor = Book.distinct("author");
  res.status(200).json({allAuthor});
})

// list books by author 
router.get("/listauthors", (req,res,next) => {
  var author = req.query;
  Book.find({author:author},(err,result) => {
    res.status(200).json({result});
  })
})


//  list all tags 
router.get("/listtags", (req,res,next) => {
  var allTags = Book.distinct("tags");
  res.status(200).json({allTags});
})

// list ascending order 
router.get("/ascending", (req,res,next) => {
  var tag = Book.find().sort({"tags":1});
  res.status(200).json({tag});
})

// list descending order 
router.get("/descending", (req,res,next) => {
  var tag = Book.find().sort({"tags":-1});
  res.status(200).json({tag});
})

// fillter book by tags 
router.get("/tagsfilter", (req,res,next) => {
  var tag = req.query;
  Book.find({tag:tags},(err,result) => {
    if(err) return next(err);
    res.status(200).json({result})
  })
})


module.exports = router;