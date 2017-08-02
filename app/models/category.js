var mongoose = require('mongoose');

var CategorySchema = require('../schemas/category')
 
var Category = mongoose.model('Category',CategorySchema)//自动创建了名为movies的collection

module.exports = Category;