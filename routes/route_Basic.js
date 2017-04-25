var express = require('express');
var bodyParser = require('body-parser');
var Blog = require('./../models/blog');
var Router = express.Router();

// // create a comment
// Router.post('/:id/comments', (req, res)=>{
//     var id = req.params.id;
//     var newComment = req.body.comment;
//     newComment.author = req.body.author;
//     blog.update({_id:id}, {$push:{comments:newComment}}, (err,blog)=>{
//         if(err) return res.json({success:false, message:err});
//         res.redirect('');
//     })
// });

Router.route('/topic/add/add').post((req, res)=> {
  var title = req.body.title;
  var description = req.body.description;

  var blog = new Blog();

  blog.title = title;
  blog.description = description;
  
  blog.save((err)=>{
    if(err) return handleError(err);
    console.log('save ok!!!');
    res.redirect('/api');
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
  console.log(req.params.id);
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