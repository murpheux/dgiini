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

router.post('/client', (req, res, next) => {});

router.post('/vendor', (req, res, next) => {});

router.post('/task', (req, res, next) => {})

router.get('/api/task', (req, res, next) => {})

router.get('/client', (req, res, next) => {})

router.get('/vendor', (req, res, next) => {})

router.put('/task', (req, res, next) => {})

router.put('/rate', (req, res, next) => {})

router.post('/ztasks', (req, res) => {
    let user = new User(req.body.name,
        req.body.username, req.body.email);
    res.json(user);
})

export default router;