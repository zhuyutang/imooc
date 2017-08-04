	var Category = require('../models/Category')
	var Movie = require('../models/movie')

	// 首页列表
	exports.index = function(req,res){
		Category 
		.find({})
		.populate({path:'movies',options:{limit:5}})
		.exec(function(err,categories){
			if(err){
				console.log(err)
			}
			res.render('index',{ 
				title:"imooc 首页",
				categories:categories
			})
		})
	}  

	// 查询
	exports.search = function(req,res){
		var catId = req.query.cat//分类搜索
		var q = req.query.q//关键字搜索
		var page = parseInt(req.query.p) || 0
		var row = 2;//每页的条数
		var index = page*row;//索引

		if(catId){
			Category.find({_id:catId})
			.populate({
				path:'movies',
				select:"title poster"
				// options:{limit:row,skip:row*page} --返回从第skip条过后的limit条；但得不到总条数
			})
			.exec(function(err,categories){			

				if(err){
					console.log(err)
				}

				var category = categories[0] || {}
				var movies = category.movies || {}
				var results = movies.slice(index,index+row)

				res.render('results',{ 
					title:"imooc 结果列表页",
					keyword:category.name,
					currentPage:(page+1),
					query:"cat="+catId,
					totalPage:Math.ceil(movies.length / row),//向上取整
					movies:results
				})
			})
		}else{
			var key = new RegExp(q+'.*','i')
			Movie.find({title:key})
				.exec(function(err,movies){			

					if(err){
						console.log(err)
					}

					var results = movies.slice(index,index+row)

					res.render('results',{ 
						title:"imooc 结果列表页",
						keyword:q,
						currentPage:(page+1),
						query:"q="+q,
						totalPage:Math.ceil(movies.length / row),//向上取整
						movies:results
					})
			})
		}

	}  