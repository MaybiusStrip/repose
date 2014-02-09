var _ = require('lodash');

var queryHandlers = {};

queryHandlers.String = function (properties, reqQuery, dbQuery) {
  properties.forEach(function (stringProperty) {
    var stringQuery = reqQuery[stringProperty];
    if (stringQuery) {
      dbQuery = dbQuery.where(stringProperty).equals(stringQuery);
    }
  });

  return dbQuery;
};

module.exports = function (req, cb) {
  var q = this.Model.find();

  properties = _getModelProperties(this.Model);

  q = queryHandlers.String(properties.String, req.query, q);

  q.exec(function (err, docs) { cb(err, docs); });
};

function _getModelProperties(Model) {
  var properties = {
    'String': [],
    'Date': [],
    'ObjectId': [],
    'Number': []
  };

  var propertyBlacklist = [ '_id', '__v' ];
  _.forOwn(Model.schema.paths, function (type, key) {
    if (propertyBlacklist.indexOf(key) !== -1) return;
    // Might be a risky way of getting the property
    properties[_getFunctionName(type.options.type)].push(key);
  });

  return properties;
}


function _getFunctionName(fun) {
  var name = fun.toString().substr('function '.length);
  return name.substr(0, name.indexOf('('));
}

