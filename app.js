var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

app.set('view engine', 'ejs');
app.set('index', './views');

app.listen(3000,function(){
  console.log('Connected port 3000!!!');
});
