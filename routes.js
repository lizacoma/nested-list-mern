const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');
const TodoS  = require('./todo-schema')

router.get('/todos', (req, res) => {
    TodoS.find({})
    .then(todos => {
        res.send(todos);
    });
});

router.post('/todos', (req, res) => {
    
    TodoS.create(req.body)
    .then(todos => {
        res.send(todos);
    });
});

router.put('/todos', (req, res) => {
    TodoS.updateOne({_id: req.body._id}, req.body)
    .then(() => {
        TodoS.find({_id: req.body._id}) 
        .then(body=> {
            res.send(body);
        })
        
    });
});

router.delete('/todos/:id', (req, res) => {
    TodoS.deleteOne({_id: req.params.id})
    .then(todo => {
        res.send(todo);
    })
});

module.exports = router;