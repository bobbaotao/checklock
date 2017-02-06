var express = require('express');
var router = express.Router();
var WeatherAPI = require('../util/tpweatherapi');

const UID = process.env.WeatherAPIUID ||  'U50A8E2DAE';
const Key = process.env.WeatherAPIKey || 'q6kojsknkhdwjsno';

router.get('/getweather/:key', function(req, res, next) {
  var api = new WeatherAPI(UID, Key);
  api.getWeatherNow(req.params.key).then(function(data){
    //console.dir(data);
    res.json({
      success: true,
      data: data.results[0].now
    });
  }).catch(function(error){
    //console.dir(error);
    res.json({
      success: false,
      data: error
    });
  });
});

module.exports = router;
