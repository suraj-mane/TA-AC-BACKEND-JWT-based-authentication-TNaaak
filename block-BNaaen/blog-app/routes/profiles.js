var express = require('express');
var router = express.Router();
var User = require('../model/users');
var auth = require('../midlware/auth');

// Get Profile 
router.get('/:username', async (req,res,next) => {
    var username = req.params.username;
    try {
        var user = await User.findOne({username});
        res.status(200).json({user});
    } catch (error) {
        next(error);
    }
})

// follow user 
router.post('/:username/follow', auth.varifyToken, async (req,res,next) => {
    var username = req.params.username;
    var id = req.user.userId;
    try {
        var user = await User.findOne({username});
        var profile = await User.findByIdAndUpdate(user.id, {$push:{followers: id}});
        res.status(200).json({profile});
    } catch (error) {
       next(error); 
    }
})

// unfollow user 
router.get('/:username/follow', auth.varifyToken, async (req,res,next) => {
    var username = req.params.username;
    var id = req.user.userId;
    try {
        var user = await User.findOne({username});
        var profile = await User.findByIdAndUpdate(user.id, {$pull: {followers:id}});
        res.status(200).json({profile});
    } catch (error) {
        next(error);
    } 
})

// following user 
router.post('/:username/following', auth.varifyToken, async (req,res,next) => {
    var username = req.params.username;
    var id = req.user.userId;
    try {
        var user = await User.findOne({username});
        var profile = await User.findByIdAndUpdate(user.id, {$push:{following: id}});
        res.status(200).json({profile});
    } catch (error) {
       next(error); 
    }
})

// unfollowing user
router.get('/:username/following', auth.varifyToken, async (req,res,next) => {
    var username = req.params.username;
    var id = req.user.userId;
    try {
        var user = await User.findOne({username});
        var profile = await User.findByIdAndUpdate(user.id, {$pull: {following:id}});
        res.status(200).json({profile});
    } catch (error) {
        next(error);
    } 
})

module.exports = router;