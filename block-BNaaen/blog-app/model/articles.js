var mongoose = require('mongoose');
var schema = mongoose.Schema;

var articleSchema = new schema({
    slug:{type:String},
    title:{type:String},
    description:{type:String},
    body:{type:String},
    tag:[{type:String}],
    favorited:{type:Boolean},
    favoritesCount:{type:String, default:0},
    author:[{type:String}]
}, {timestamps:true});


module.exports = mongoose.model("article", articleSchema);