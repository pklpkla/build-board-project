var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var Blog = require('./models/blog');
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

var router = express.Router();

app.post('/topic/add',(req, res)=> {
  console.log(req.body.title);

  var title = req.body.title;
  var description = req.body.description;

  var blog = new Blog();

  blog.title = title;
  blog.description = description;
  
  blog.save((err)=>{
    if(err) return handleError(err);
    console.log('save ok!!!');
  })
});

app.get('/topic/add',(req, res)=> {
  res.render('add', {title : 'Hello world'});
});

// 리스트 표현
app.get('/',(req, res)=> {
  Blog.find((err, blogs)=>{
    if(err) {
      res.send(err);
    }
    res.render('index', {blogs : blogs});
  })
});

// 리스트 선택
app.get('/topic/:id',(req, res)=> {
  var id = req.params.id;
  Blog.findById(id, (err, blogs)=>{
    if(err) {
      res.send(err);
    }
    // res.json(blogs.description);
    res.render('detail', { blogs:blogs })
  })
});

app.listen(3000,function(){
  console.log('Connected port 3000!!!');
});
