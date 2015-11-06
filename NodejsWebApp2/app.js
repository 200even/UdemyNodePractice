//Module Dependencies
var express = require('express');
var jade = require('jade');
var routes = require('./routes');
var nib = require('nib');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
var stylus = require('stylus');
var db = monk('localhost:27017/nodejswebapp2');

//Set Port Number
var port = 3000;

//Init Express
var app = express();
console.log('Express Initialized');

function compile(str, path){
    return stylus(str)
    .set('filename', path)
    .use(nib())
}

//Set Views Folder
app.set('views', __dirname + '/views');

//Init Jade
app.set('view engine', 'jade');

//Stylus Middleware
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('mykey'));
app.use(express.session());
app.use(app.router);
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

app.get('/', routes.index);
app.get('/userlist', routes.userlist(db));
app.post('/adduser', routes.adduser(db));

//Set Static Folder
app.use(express.static(__dirname + '/public'));

//App listen
app.listen(port);
console.log('Connected to port ' + port);