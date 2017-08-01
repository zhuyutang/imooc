var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Movie = require('../app/controllers/movie')
var Comment = require('../app/controllers/comment')
 
module.exports = function(app){
	
	// 保留登陆状态
	app.use(function(req,res,next){
		var _user = req.session.user;
		app.locals.user = _user;
		next()
	})

	// 首页
	app.get('/',Index.index)

	// User
	app.post("/user/signup",User.signup)
	app.post("/user/signin",User.signin)
	app.get("/signin",User.showSignin)
	app.get("/signup",User.showSignup)
	app.get("/logout",User.logout)
	app.get('/admin/userlist',User.signinRequired,User.adminRequired, User.list) 

	// movie
	app.get('/movie/:id',Movie.detail)
	app.get('/admin/movie',User.signinRequired,User.adminRequired,Movie.new)
	app.get('/admin/update/:id',User.signinRequired,User.adminRequired,Movie.update)
	app.post('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.save)
	app.get('/admin/list',User.signinRequired,User.adminRequired,Movie.list)
	app.delete('/admin/list',User.signinRequired,User.adminRequired,Movie.del)

	// 评论
	app.post('/user/comment',User.signinRequired,Comment.save)
}
