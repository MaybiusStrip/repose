var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  name: { type: String },
  joinDate: { type: Date }
});

mongoose.model('User', userSchema);

