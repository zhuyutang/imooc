var express = require("express");
var path = require('path')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')//表单数据格式化
var cookieParser = require('cookie-parser')//cookie
var session = require('express-session')//session,依赖cookie
var mongoStore = require('connect-mongo')(session)
var logger = require('morgan')//日志

var port = 3000;
var app = express(); 
var dbUrl = "mongodb://localhost/imooc"
mongoose.connect(dbUrl) 

app.set("views","./app/views/pages");
app.set("view engine","jade");

app.use(bodyParser.urlencoded({extended: true}))//表单数据格式化
app.use(express.static(path.join(__dirname,'public')))//静态资源的请求路径
// app.use(multipart())//为了获取表单的文件数据
app.use(cookieParser())//
app.use(session({
	secret:"imooc",
	store:new mongoStore({
		url:dbUrl,
		collection:'sessions'
	})
}))

// 配置开发环境
if(app.get('env') == 'development'){
	// app.set('showStackError',true)
	app.use(logger(':method :url :status'))
	app.locals.pretty = true
	mongoose.set('debug',true)
}

require('./config/routes')(app)//引入路由

app.locals.moment = require('moment')//时间格式化:app.locals 可以像参数一样传入所有的模板中
app.listen(port);
console.log("imooc, started on port" + port);

// console.log("测试model")
// var test = require('./test')

// console.log(test.call)
  