var request = require('supertest');
var should = require('should');
var mongoose = require('mongoose');

require('./models/user');
var User = mongoose.model('User');

var URL = 'http://localhost:3001';

module.exports = function () {

  describe('/user', function () {
    it('should create a user with the provided data', function (done) {

      var user = {
        name: 'Randy Marsh',
        joinDate: new Date(2014, 1, 1, 0, 0, 0, 0)
      };

      request(URL)
        .post('/user')
        .send(user)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('joinDate');
          res.body.name.should.equal(user.name);
          res.body.joinDate.should.equal(user.joinDate.toISOString());

          User.findById(res.body._id, function (err, user) {
            if (err) throw err;
            should.exist(user);
            user._id.toString().should.equal(res.body._id);
            user.name.should.equal(user.name);
            user.joinDate.should.equal(user.joinDate);
            done();
          });
        });

    });
  });

};

