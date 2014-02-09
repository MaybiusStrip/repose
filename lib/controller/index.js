var _ = require('lodash');

var Controller = function (Model) {
  this.Model = Model;
  this.name = Model.modelName;
};

[
  'get',
  'list',
  'create'
].forEach(function (method) {
  Controller.prototype[method] = function (req, res) {
    require('./methods/' + method).bind(this)(req, _respond(res));
  };
});

function _respond(res) {
  return function (err, doc) {
    if (err) { return res.json(500, err); }
    return res.json(200, doc);
  };
}


module.exports = Controller;

