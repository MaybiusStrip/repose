var should = require('should');
var express = require('express');
var request = require('supertest');
var mongoose = require('mongoose');
var repose = require('../index.js');

require('./models/task');
var Task = mongoose.model('Task');
var URL = 'http://localhost:3001';
describe('Controller routes', function(){

  before(function (done) {
    mongoose.connect('mongodb://localhost/repose_test');
    var app = express();

    app.configure(function () {
      app.use(express.json());
      app.use(express.urlencoded());
      var TaskController = new repose.Controller(Task);
      repose.bindRoutes(app, TaskController);

      app.listen(3001);
      done();
    });

  });

  afterEach(function (done) {
    Task.remove({}, done);
  });

  describe('GET', function () {

    describe('/task/:id', function () {
      it('should return the task with that id', function (done) {

        var task = new Task({
          name: 'Task 1',
          dueDate: new Date(2014, 1, 1, 0, 0, 0, 0)
        });

        task.save(function (err, task) {
          if (err) throw err;

          request(URL)
            .get('/task/' + task._id)
            .expect(200)
            .end(function(err, res) {
              if (err) throw err;
              res.body.should.have.property('_id');
              res.body._id.should.equal(task._id.toString());
              res.body.name.should.equal(task.name);
              res.body.dueDate.should.equal(task.dueDate.toISOString());
              done();
            });
        });

      });
    });

  });


});
