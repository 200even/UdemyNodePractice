var express = require('express');
var zipcode = require('zipcode');
var jade = require('jade');
var port = 3000;

//Init Express
var app = express();
console.log('Express Initialized');

//Set Views Folder
app.set('views', __dirname + '/views');

//Init Jade
app.set('view engine', 'jade');

//Set Static Folder
app.use(express.static(__dirname + '/public'));

var year = new Date().getFullYear()
//Render Index
app.get('/', function (req, res) {
    res.render('index', { title: 'Welcome', year: year });
});

//App listen
app.listen(port);
console.log('Connected to port ' + port);