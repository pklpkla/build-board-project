var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected MongoDB');
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(3000,function(){
  console.log('Connected port 3000!!!');
});
