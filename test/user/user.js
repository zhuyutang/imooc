var crypto = require('crypto')
var bcrypt = require('bcrypt')

function getRandomString(len){
	if(!len) len = 16;
	return crypto.randomBytes(Math.ceil(len/2)).toString('hex')
}

var should = require('should')
var app = require('../../app')
var mongoose = require('mongoose')
var User = require('../../app/models/user')

//test