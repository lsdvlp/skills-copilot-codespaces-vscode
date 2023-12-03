// Create web server

var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var ejs = require('ejs');
var url = require('url');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "111111",
  database: "test"
});

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/list', function (req, res) {
  var sql = 'select * from comments';
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.render('list.ejs', { comments: result });
    }
  });
});

app.post('/add', function (req, res) {
  var body = req.body;
  var name = body.name;
  var comment = body.comment;
  var sql = 'insert into comments (name,comment) values (?,?)';
  con.query(sql, [name, comment], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/list');
    }
  });
});

app.listen(3000, function () {
  console.log('Server Running at http://');