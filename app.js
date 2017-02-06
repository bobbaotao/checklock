var express = require('express');
var app = express();
var weatherRouter = require('./apis/getweather.js');
var cors = require('cors');

app.use(cors());
app.get('/', function(req,res){
  res.send('Hello World!');
})

app.use('/apis/', weatherRouter);

app.use(express.static('build'));

module.exports =  app;
