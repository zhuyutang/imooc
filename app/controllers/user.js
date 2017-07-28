var User = require('../models/user')

//显示登陆页面
exports.showSignin  = function(req,res){
	res.render('signin',{
		title:"登陆页面",
	})
}

//显示注册页面
exports.showSignup  = function(req,res){
	res.render('signup',{
		title:"注册页面",
	})
}


// 用户注册
	exports.signup  = function(req,res){
		var _user = req.body.user
		console.log(_user)
		User.find({name:_user.name},function(err,user){
			if(err){
				console.log(err)
			}
			if(user){
				console.log('用户名已注册')
				return res.redirect('/signin')
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
				return res.redirect('/signup')
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
					return res.redirect('/signin')
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
