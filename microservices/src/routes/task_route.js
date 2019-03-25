import express from 'express';
const router = express.Router();
import Task from '../model/task';

router.get('/', (req, res, next) => {
    let payload = {
        "payload": "Hello From ImageCompacter service"
    };

    res.json(payload);
});

router.get('/tasks', (req, res, next) => {
    let tasks = [
        new Task('James Coonce'),
        new Task('Bob Coonce'),
        new Task('Euri'),
        new Task('Norman'),
    ];

    res.json(tasks);
});

router.post('/tasks', (req, res) => {
    let user = new User(req.body.name,
        req.body.username, req.body.email);
    res.json(user);
})

export default router;