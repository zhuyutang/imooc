	var Movie = require('../models/movie')

	// 首页
	exports.index = function(req,res){
		Movie.fetch(function(err,movies){
			if(err){
				console.log(err)
			}
			res.render('index',{ 
				title:"imooc 首页",
				movies:movies
			})
		})
	}  