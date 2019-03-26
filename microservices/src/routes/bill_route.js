import express from 'express';
const router = express.Router();
import uuid from 'uuid/v4';

router.get('/', (req, res, next) => {
    let payload = {
        "Service": `${app_name} ${version} ${build}`
    }

    res.json(payload)
});

router.post('/addcard', (req, res, next) => {});

router.post('/removecard', (req, res, next) => {});

router.post('/billcard', (req, res, next) => {})

router.get('/getcard', (req, res, next) => {})

router.get('/addacct', (req, res, next) => {})

router.get('/removeacct', (req, res, next) => {})

router.put('/billacct', (req, res, next) => {})

router.put('/getacct', (req, res, next) => {})

router.get('/updaterate', (req, res, next) => {})

router.put('/prepinvoice', (req, res, next) => {})

router.put('/prepreceipt', (req, res, next) => {})

export default router;