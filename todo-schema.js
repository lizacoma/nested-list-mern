const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    text: String,
    position: Number
});

const TodoS = mongoose.model('todo', TodoSchema);

module.exports = TodoS;