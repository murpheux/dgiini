#!node

'use strict';

import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
    let payload = {
        "Service": `${app_name} ${version} ${build}`
    }

    res.json(payload)
});

router.post('/sendmail', (req, res, next) => {});

router.post('/queuemail', (req, res, next) => {});

router.post('/sendsms', (req, res, next) => {})

router.get('/newmessage', (req, res, next) => {})

router.get('/getmessage', (req, res, next) => {})

router.get('/newfeedback', (req, res, next) => {})


export default router;