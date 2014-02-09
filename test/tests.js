var should = require('should');
var express = require('express');
var request = require('supertest');
var mongoose = require('mongoose');
var repose = require('../index.js');

var fixtures = require('./fixtures.js');

require('./models/user');
var User = mongoose.model('User');

var URL = 'http://localhost:3001';

describe('Controller routes', function(){

  before(function (done) {
    mongoose.connect('mongodb://localhost/repose_test');
    var app = express();

    app.configure(function () {
      app.use(express.json());
      app.use(express.urlencoded());
      var UserController = new repose.Controller(User);
      repose.bindRoutes(app, UserController);

      app.listen(3001);
      done();
    });

  });

  beforeEach(function (done) {
    fixtures.setup(done);
  });

  afterEach(function (done) {
    fixtures.tearDown(done);
  });

  describe('get', function () {

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

  });

  describe('post', function () {

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

  });


});

