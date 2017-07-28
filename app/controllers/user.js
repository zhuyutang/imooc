var User = require('../models/user')

// 用户注册
	exports.signup  = function(req,res){
		var _user = req.body.user
		console.log(_user)
		User.find({name:_user.name},function(err,user){
			if(err){
				console.log(err)
			}
			console.log(user)
			if(user.length > 0){
				console.log('用户名已注册')
				return res.redirect('/')
			}else{
				var user = new User(_user)
				user.save(function(err,user){
					if(err){ 
						console.log(err)
					}
					res.redirect("/admin/userlist")
				})
			}
		})
	}

	// 用户登录
	exports.signin = function(req,res){
		var _user = req.body.user
		var name = _user.name
		var password = _user.password

		User.findOne({name:name},function(err,user){
			if(err){
				console.log(err)
			}
			console.log(user)
			if(!user){
				console.log('不存在此用户名')
				return res.redirect('/')
			}

			user.comparePassword(password,function(err,isMatch){
				if(err){
					console.log(err)
				}

				if(isMatch){
					req.session.user = user;
					return res.redirect('/')
				}else{
					console.log("password is not matched")
					return res.redirect('/')
				}

			})

		})
	}

	// 用户退出登录
	exports.logout = function(req,res){
		delete req.session.user;
		// delete app.locals.user;
		res.redirect('/')
	}

	// 用户列表页
	exports.list = function(req,res){
		
			User.fetch(function(err,users){
			if(err){
				console.log(err)
			}
			res.render('userlist',{
				title:"imooc 用户列表页",
				users:users
			})
		})
	}
