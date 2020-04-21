const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TodoList = new Schema({

    todoList: Schema.Types.Mixed
    
});

const TodoS = mongoose.model('todo', TodoList);

module.exports = TodoS;