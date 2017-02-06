'use strict'

const request = require('supertest');
const should = require('should');

const app =  require('././app.js');

describe('test weather api: ', function(){
    it('get shanghai weather', function(done) {
      request(app).get('/apis/getweather/shanghai')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        res.data.success.should.equal(true);
        should.exist(res.data.data.text);
        done();
      })
    });

    it('get undefined city weather', function(done) {
      request(app).get('/apis/getweather/ysxyesij12803dwe')
      .expect(200)
      .end((err, res) => {
        should.exist(err);
        should.exist(res.data.data);
        done();
      })
    });
});
