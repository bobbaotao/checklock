var express = require('express');
var router = express.Router();

router.get('/lockout/:key', function(req, res, next){
  //console.log(req.params.key);
  var result = [{
    key: req.params.key,
    times: 2,
    unlocktime: new Date().toLocaleTimeString()
  },
  {
    key: req.params.key + "1",
    times: 1,
    unlocktime: new Date().toLocaleTimeString()
  }];

  //console.dir(result);
  res.json({
    data: result
  });
});

module.exports = router;
