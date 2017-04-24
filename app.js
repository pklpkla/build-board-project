var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected MongoDB');
});

app.set('view engine', 'ejs');
app.set('views', './views');

var blogSchema = mongoose.Schema({
  title: String,
  description: String
});


app.post('/topic/add',(req, res)=> {
  // console.log(req.body.title);
  var blog = mongoose.model('blog', blogSchema);
  var title = req.body.title;
  var description = req.body.description;
  var blog = new blog({title:title, description:description});
  blog.save((err)=>{
    console.log('???');
    if(err) return handleError(err);
    console.log('save ok!!!');
  })
});

app.get('/topic/add',(req, res)=> {
  res.render('add', {title : 'Hello world'});
});

app.get('/', function(req, res) {
  res.render('index', {title : 'Hello world'});
});

app.listen(3000,function(){
  console.log('Connected port 3000!!!');
});
