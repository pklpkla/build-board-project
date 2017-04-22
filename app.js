var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(3000,function(){
  console.log('Connected port 3000!!!');
});
