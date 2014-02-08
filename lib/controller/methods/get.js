module.exports = function (req, cb) {
  this.model
    .findById(req.params.id)
    .exec(function (err, doc) {
      cb(err, doc);
    });
};
