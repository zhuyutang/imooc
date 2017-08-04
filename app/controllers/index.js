	var Category = require('../models/Category')

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
		var catId = req.query.cat
		var page = parseInt(req.query.p)
		var row = 2;//每页的条数
		var index = page*row;//索引

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
	}  