
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

var server = app.listen(4000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('server is listening at http://%s:%s', host, port);
});
