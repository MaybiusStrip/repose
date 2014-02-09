var should = require('should');
var express = require('express');
var mongoose = require('mongoose');
var repose = require('../index.js');

var fixtures = require('./fixtures.js');

require('./models/user');
var User = mongoose.model('User');


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

  describe('get', require('./get'));
  describe('create', require('./create'));


});

