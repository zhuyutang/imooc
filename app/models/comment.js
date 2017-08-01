var mongoose = require('mongoose');

var CommentSchema = require('../schemas/comment')
 
var Comment = mongoose.model('Comment',CommentSchema)//自动创建了名为comments的collection

module.exports = Comment;