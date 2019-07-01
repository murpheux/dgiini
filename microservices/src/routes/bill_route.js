'use strict'

import express from 'express'
import mongodb from 'mongodb'
import validator from 'fluent-validator'
import HttpStatus from 'http-status-codes'

import common from '../shared/common'
import build_response from '../shared/lib'
import winston from '../winston'

const router = express.Router()
const mongoClient = mongodb.MongoClient

const database = process.env.TASK_DATABASE || 'dg_taskdb'
const TASK_COLL = 'tasks'
const VALIDATION_MSG = 'validation errors encountered'

const options = {
    poolSize: 20,
    socketTimeoutMS: 480000,
    keepAlive: 300000,
    sslValidate: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true
}

const setup_database = () => {
    mongoClient.connect(common.database_uri, options, (err, client) => {
        client.db(database).createCollection(TASK_COLL, (err) => {
            if (err) { winston.error(err) }

            winston.info(`Collection ${TASK_COLL} created!`)
            client.close()
        })
    })
}

setup_database()

router.post('/cards', (req, res) => {
    const card = req.body
    const validation = validateCard(card)

    if (validation.hasErrors()) {

        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {

        res.status(HttpStatus.OK).json({})
    }
})

router.post('/card/:cardno', (req, res) => {

    res.status(HttpStatus.OK).json({})
})

router.post('/billcard', (req, res) => {

    res.status(HttpStatus.OK).json({})
})

router.get('/getcard', (req, res) => {

    res.status(HttpStatus.OK).json({})
})

router.get('/addacct', (req, res) => {

    res.status(HttpStatus.OK).json({})
})

router.get('/removeacct', (req, res) => {

    res.status(HttpStatus.OK).json({})
})

router.put('/billacct', (req, res) => {

    res.status(HttpStatus.OK).json({})
})

router.put('/getacct', (req, res) => {

    res.status(HttpStatus.OK).json({})
})

router.get('/updaterate', (req, res) => {

    res.status(HttpStatus.OK).json({})
})

router.put('/prepinvoice', (req, res) => {

    res.status(HttpStatus.OK).json({})
})

router.put('/prepreceipt', (req, res) => {

    res.status(HttpStatus.OK).json({})
})

const validateCard = (card) => {
    const validation = validator()
        .validate(card.cardno).isNotEmpty()

    return validation
}

module.exports = router