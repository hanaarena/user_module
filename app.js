
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var User = require('./models/user');

var mongoose = require('mongoose')
var mongoStore = require('connect-mongo')(express)
var dbUrl = 'mongodb://localhost/userss';

mongoose.connect(dbUrl);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

//signup
app.post('/user/signup', function(req, res) {
	var _user = req.body.user //获取表单的数据
	//console.log(_user);
	var user = new User(_user);

	user.save(function(err, user) {
		if(err) {
			console.log(err);
		}
		console.log(user);
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
