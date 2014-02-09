var fixtures = require('./fixtures.js');
var request = require('supertest');
var should = require('should');
var mongoose = require('mongoose');

require('./models/user');
var User = mongoose.model('User');

var URL = 'http://localhost:3001';

module.exports = function () {

  describe('/user/:id', function () {
    it('should return the user with that id', function (done) {

      var user = fixtures.users[0];

      request(URL)
        .get('/user/' + user._id)
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.property('_id');
          res.body._id.should.equal(user._id.toString());
          res.body.name.should.equal(user.name);
          res.body.joinDate.should.equal(user.joinDate.toISOString());
          done();
        });

    });
  });

};
