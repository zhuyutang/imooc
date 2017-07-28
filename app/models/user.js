var mongoose = require('mongoose');

var UserSchema = require('../schemas/user')
 
var User = mongoose.model('User',UserSchema)//自动创建了名为users的collection

module.exports = User; 