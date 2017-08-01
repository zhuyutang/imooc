var Comment = require('../models/comment')

// 数据上传页
exports.save  = function(req,res){
	var _comment = req.body.comment;
	var movieId = _comment.movie

	// 如果是回复其他评论，则不创建新的评论
	if(_comment.cid){
		Comment.findById(_comment.cid,function(err,comment){
			var reply = {
				from:_comment.from,
				to:_comment.tid,
				content:_comment.content
			}
			comment.reply.push(reply)
			comment.save(function(err,comment){
				if(err){
					console.log(err)
				}
				res.redirect('/movie/' + movieId)
			})
		})
	}else{
		var comment = new Comment(_comment)

		comment.save(function(err,comment){
			if(err){
				console.log(err)
			}
			res.redirect('/movie/' + movieId)
		})
	}
}

	