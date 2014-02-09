var pmf = require('pow-mongodb-fixtures');
var fixtures = pmf.connect('repose_test');
var id = pmf.createObjectId;

var users = [
  {
    _id: id('000000000000000000000001'),
    name: 'Stan Marsh',
    joinDate: new Date(2014, 1, 1, 0, 0, 0, 0)
  },
  {
    _id: id('000000000000000000000002'),
    name: 'Kyle Broflovski',
    joinDate: new Date(2013, 1, 1, 0, 0, 0, 0)
  },
  {
    _id: id('000000000000000000000003'),
    name: 'Eric Cartman',
    joinDate: new Date(2014, 1, 15, 0, 0, 0, 0)
  },
  {
    _id: id('000000000000000000000004'),
    name: 'Kenny McCormick',
    joinDate: new Date(2013, 6, 1, 0, 0, 0, 0)
  }
];

function setup(cb) {
  fixtures.clearAndLoad({
    users: users
  }, cb);
}

function tearDown(cb) {
  fixtures.clear([
    'users'
  ], cb);
}

module.exports = {
  setup: setup,
  tearDown: tearDown,
  users: users
};

