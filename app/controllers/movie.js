var _ = require('underscore')//函数库，主要用extend方法 
var Movie = require('../models/movie')
var Comment = require('../models/comment')
var Category = require('../models/category')
 

// 详情页
	exports.detail = function(req,res){
		var id = req.params.id;//获取上传过来的参数的形式一
		Movie.findById(id,function(err,movie){
			Comment.find({movie:id})
			.populate('from','name')
			.populate('reply.from reply.to','name')
			.exec(function(err,comments){
				res.render('detail',{
					title:"imooc"+ movie.title,
					movie:movie,
					comments:comments
				})
			})
		})
	}

	// 后台录入页
	exports.new  = function(req,res){
		Category.find({},function(err,categories){
			res.render('admin',{
				title:"imooc 电影录入",
				categories:categories,
				movie:{}
			})
		})
	}

	// 数据更新页
	exports.update  = function(req,res){
		var id = req.params.id
		if(id){
			Movie.findById(id,function(err,movie){
				Category.find({},function(err,categories){
					res.render('admin',{
						title:'imooc 电影更新',
						movie:movie,
						categories:categories
					})
				})
			})
		}
	}

	// 数据上传页
	exports.save  = function(req,res){

		console.log(req.body.movie)

		var id = req.body.movie._id;//获取上传过来的参数的形式二
		var movieObj = req.body.movie
		var _movie
		if(id){
			Movie.findById(id,function(err,movie){
				if(err){
					console.log(err)
				}
				_movie = _.extend(movie,movieObj)
				_movie.save(function(err,movie){
					if(err){
						console.log(err)
					}

					res.redirect('/movie/' + movie._id)
				})
			})
		}
		else{
			_movie = new Movie(movieObj)
			var categoryId = _movie.category
			_movie.save(function(err,movie){
				if(err){
					console.log(err)
				}

				// 把电影存入分类中
				Category.findById(categoryId,function(err,category){
					category.movies.push(movie._id)
					category.save(function(err,category){
						res.redirect('/movie/' + movie._id)
					})
				})
			})
		}
	}

	// 后台列表页
	exports.list = function(req,res){
		
			Movie.fetch(function(err,movies){
			if(err){
				console.log(err)
			}
			res.render('list',{
				title:"imooc 后台列表页",
				movies:movies
			})
		})
	}

	// 后台列表删除
	exports.del = function(req,res){
			var id = req.query.id;//获取上传过来的参数的形式三
			console.log("id是：" +id)
			if(id){
				Movie.remove({_id:id},function(err,movie){
					if(err){
						console.log(err)
					}else{
						res.json({success:1})
					}
				}) 
			}

	}