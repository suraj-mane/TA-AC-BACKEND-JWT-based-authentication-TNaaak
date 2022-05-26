var mongoose = require('mongoose');
var schema = mongoose.Schema;

var bookSchema = new schema({
  title:{type:String},
  cartgory:{type:String},
  pages:{type:String},
  price:{type:String},
  author:{type:String},
  tags:{type:String},
  cartgory:[{type:String}],
  commentId:{type:schema.Types.ObjectId, ref:"comment"}
},{timestamps:true});

module.exports = mongoose.model('book', bookSchema);