var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Movie = require('../app/controllers/movie')

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
	app.get("/user/logout",User.logout)
	app.get('/admin/userlist',User.list) 

	// movie
	app.get('/movie/:id',Movie.detail)
	app.get('/admin/movie',Movie.new)
	app.get('/admin/update/:id',Movie.update)
	app.post('/admin/movie/new',Movie.save)
	app.get('/admin/list',Movie.list)
	app.delete('/admin/list',Movie.del)
}
