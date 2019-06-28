'use strict'

const express = require('express')
const mongoClient = require('mongodb').MongoClient
const common = require('../shared/common')
const build_response = require('../shared/lib')
const validator = require('fluent-validator')
const router = express.Router()
const winston = require('../winston')
const HttpStatus = require('http-status-codes')
const ObjectId = require('mongodb').ObjectId
const titleCase = require('title-case')

const database = process.env.MESSAGE_DATABASE || 'dg_messagedb'
const MESSAGE_COLL = 'messages'
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
        client.db(database).createCollection(MESSAGE_COLL, (err, _) => {
            if (err) { winston.error(err) }

            winston.info(`Collection ${MESSAGE_COLL} created!`)
            client.close()
        })
    })
}

setup_database()


// get message
router.get('/messages/:sender', (req, res) => {

    res.json({})
})

// task message
router.get('/messages/task/:id', (req, res) => {

    res.json({})
})


// get messages
router.post('/sendmessage', (req, res) => {


    res.json({})
})

module.exports = router