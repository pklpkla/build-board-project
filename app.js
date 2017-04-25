/**
 * 게시판 만들기
 * 
 * 기본 게시판 기능 구현
 *
 * @date 2017-4-25
 * @author ...
 */

// Express 기본 모듈 불러오기
var express = require('express');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var Blog = require('./models/blog');
mongoose.connect('mongodb://localhost/test');

// 모듈로 분리한 라우팅 파일 불러오기
var router = require('./routes/route_Basic');

// 익스프레스 객체 생성
var app = express();

//라우팅 정보를 읽어들여 라우팅 설정
app.use('/api', router);

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//===== 뷰 엔진 설정 =====//
app.set('view engine', 'ejs');
app.set('views', './views');
console.log('뷰 엔진이 ejs로 설정되었습니다.');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected MongoDB');
});

app.listen(3000,function(){
  console.log('Connected port 3000!!!');
});
