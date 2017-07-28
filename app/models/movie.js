var mongoose = require('mongoose');

var MovieSchema = require('../schemas/movie')
 
var Movie = mongoose.model('Movie',MovieSchema)//自动创建了名为movies的collection

module.exports = Movie;