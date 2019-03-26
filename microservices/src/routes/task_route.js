import express from 'express';
const router = express.Router();
import Task from '../model/task';
import uuid from 'uuid/v4';


router.get('/', (req, res, next) => {
    let payload = {
        "payload": "Hello From ImageCompacter service"
    }

    res.json(payload)
});

router.get('/tasks', (req, res, next) => {
    let tasks = [
        new Task(uuid(), 'Task 1'),
        new Task(uuid(), 'Task 2'),
        new Task(uuid(), 'Task 3'),
        new Task(uuid(), 'Task 4'),
    ];

    res.json(tasks);
});

router.post('/tasks', (req, res) => {
    let user = new User(req.body.name,
        req.body.username, req.body.email);
    res.json(user);
})

export default router;