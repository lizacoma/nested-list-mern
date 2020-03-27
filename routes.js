const express = require('express');
const router = express.Router();
const TodoS  = require('./todo-schema')
//прописуємо шляхи для кожного роута і ескпортуємо внизу під ім'ям router

router.get('/todos', (req, res) => {
    TodoS.find({})
    .then(todo => {
        res.send(todo);
    });
});

router.post('/todos', (req, res) => {
    TodoS.create(req.body)
    .then(todo => {
        res.send(todo);
    });
});

router.put('/todos/:id', (req, res) => {
    res.send({method: 'PUT'});
});

router.delete('/todos/:id', (req, res) => {
    res.send({method: 'DELETE'});
});

module.exports = router;