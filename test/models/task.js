var mongoose = require('mongoose');
var schema = mongoose.Schema;


var taskSchema = new schema({
  dueDate: {type: Date},
  name: {type: String},
  //campaign: {type: schema.Types.ObjectId, ref: 'Campaign'},
  //distributions: [{type: schema.Types.ObjectId, ref: 'Distribution'}],
  //error: { type: schema.Types.Mixed },
});

mongoose.model('Task', taskSchema);

