const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongooseDelete = require('mongoose-delete');

const Task = new Schema({
    name: {type: String},
    time: {type: String},
    date: {type: String},
    complete: {type: String},
    createdBy: {type: mongoose.Types.ObjectId, require: [true, "Please prive user"]}
}, {timestamps: true});

Task.plugin(mongooseDelete);
Task.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model('Task', Task);
