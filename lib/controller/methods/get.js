module.exports = function (req, cb) {
  this.Model
    .findById(req.params.id)
    .exec(function (err, doc) {
      cb(err, doc);
    });
};
