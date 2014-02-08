var _ = require('lodash');

var Controller = function (model) {
  this.model = model;
  console.log(this.model.modelName);
};

_.extend(Controller.prototype, {
  get: function (req, res) {
    console.log('this', this.model);
    require('./methods/get').bind(this)(req, _respond(res));
  }
});

function _respond(res) {
  return function (err, doc) {
    if (err) { return res.json(500, err); }
    return res.json(200, doc);
  };
}


module.exports = Controller;

