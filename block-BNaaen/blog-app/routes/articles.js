var express = require('express');
var router = express.Router();
var User = require('../model/users')
var Article = require('../model/articles');
var auth = require('../midlware/auth');
var slug = require('slug');
const { findById } = require('../model/users');


//create Articles
router.post('/', auth.varifyToken, async (req,res,next) => {
    try {
        var id = req.user.userId;
        let user = await User.findById(id);
        req.body.slug = slug(req.body.title);
        var article = await Article.create(req.body);
        res.status(200).json({article});
    } catch (error) {
        next(error);
    } 
})

// search articles
router.get('/', async (req,res,next) => {
    try {
        if(req.query.tag){
            var tag = req.query.tag;
            var tags = await Article.find({tag});
            res.status(200).json({tags});
        }
        if(req.query.author){
            var author = req.query.author;
            var authors = await User.find({author});
            res.status(200).json({authors});
        }
    } catch (error) {
        next(error);
    }
})

// slug article 
router.get('/:slug', (req,res,next) => {

})

module.exports = router;