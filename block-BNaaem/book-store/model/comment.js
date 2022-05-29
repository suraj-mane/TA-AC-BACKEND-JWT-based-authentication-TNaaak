var mongoose = require('mongoose');
var schema = mongoose.Schema;

var commentSchema = new schema({
  title:{type:String},
  bookId:{type:schema.Types.ObjectId, ref:"book"}
},{timestamps:true})

module.exports = mongoose.model("comment", commentSchema);