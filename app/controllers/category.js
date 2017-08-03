var Category = require('../models/category')

	// 后台录入页
	exports.new  = function(req,res){
		res.render('category_admin',{
			title:"imooc 后台录入"
		})
	}


	// 数据上传页
	exports.save  = function(req,res){
		var _category = req.body.category;//获取上传过来的参数的形式二
		var category = new Category(_category);
			
		category.save(function(err,category){
			if(err){
				console.log(err)
			}

			res.redirect('/admin/category/list')
		})
	}

	// 后台列表页
	exports.list = function(req,res){
		
		Category.fetch(function(err,categories){
			if(err){
				console.log(err)
			}
			res.render('categorylist',{
				title:"imooc 分类列表页",
				categories:categories
			})
		})
	}

	// // 后台列表删除
	// exports.del = function(req,res){
	// 		var id = req.query.id;//获取上传过来的参数的形式三
	// 		console.log("id是：" +id)
	// 		if(id){
	// 			Movie.remove({_id:id},function(err,movie){
	// 				if(err){
	// 					console.log(err)
	// 				}else{
	// 					res.json({success:1})
	// 				}
	// 			}) 
	// 		}

	// }