module.exports = function (req, cb) {
  var doc = new this.Model(req.body);
  doc.save(function (err, doc) {
    cb(err, doc);
  });
};
