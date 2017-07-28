var _ = require('underscore')//函数库，主要用extend方法 
var Movie = require('../models/movie')


// 详情页
	exports.detail = function(req,res){
		var id = req.params.id;//获取上传过来的参数的形式一
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err);
			}
			res.render('detail',{
				title:"imooc"+ movie.title,
				movie:movie
			})
		})
	}

	// 后台录入页
	exports.new  = function(req,res){

		console.log("get:admin/movie");

		res.render('admin',{
			title:"imooc 后台录入",
			movie:{
				title:'',
				doctor:'',
				country:'',
				year:'',
				poster:'',
				flash:'',
				summary:'',
				language:''
			}
		})
	}

	// 数据更新页
	exports.update  = function(req,res){
		var id = req.params.id

		if(id){
			Movie.findById(id,function(err,movie){
				res.render('admin',{
					title:'imooc 后台更新页',
					movie:movie
				})
			})
		}
	}

	// 数据上传页
	exports.save  = function(req,res){

		var id = req.body.movie._id;//获取上传过来的参数的形式二
		var movieObj = req.body.movie
		var _movie
		if(id !== 'undefined'){
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
			_movie = new Movie({
				doctor:movieObj.doctor,
				title:movieObj.title,
				country:movieObj.country,
				language:movieObj.language,
				year:movieObj.year,
				poster:movieObj.poster,
				summary:movieObj.summary,
				flash:movieObj.flash
			})

			_movie.save(function(err,movie){
				if(err){
					console.log(err)
				}

				res.redirect('/movie/' + movie._id)
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