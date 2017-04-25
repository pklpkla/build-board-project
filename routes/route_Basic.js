var express = require('express');
var bodyParser = require('body-parser');
var Blog = require('./../models/blog');
var Router = express.Router();

Router.route('/topic/add').post((req, res)=> {
  console.log(req.body.title);

  var title = req.body.title;
  var description = req.body.description;

  var blog = new Blog();

  blog.title = title;
  blog.description = description;
  
  blog.save((err)=>{
    if(err) return handleError(err);
    console.log('save ok!!!');
    res.redirect('/');
  })
});

Router.route('/topic/add').get((req, res)=> {
  res.render('add', {title : 'Hello world'});
});

// 리스트 표현
Router.route('/').get((req, res)=> {
  Blog.find((err, blogs)=>{
    if(err) {
      res.send(err);
    }
    res.render('index', {blogs : blogs});
  })
});

// 리스트 선택
Router.route('/topic/:id').get((req, res)=> {
  var id = req.params.id;
  Blog.findById(id, (err, blogs)=>{
    if(err) {
      res.send(err);
    }
    // res.json(blogs.description);
    res.render('detail', { blogs:blogs })
  })
});

Router.route('/topic/:id/delete').get((req, res)=> {
  var id = req.params.id;
  Blog.findByIdAndRemove(id, (err, blogs)=>{
    if(err) {
      res.send(err);
    }
    // res.json({ message: 'Blog removed from the blog'});
    res.redirect('/');
  })
});
 
module.exports = Router;