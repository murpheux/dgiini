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
const ObjectId = mongodb.ObjectId

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
        client.db(database).createCollection(MESSAGE_COLL, (err) => {
            if (err) { winston.error(err) }

            winston.info(`Collection ${MESSAGE_COLL} created!`)
            client.close()
        })
    })
}

setup_database()

// message
router.get('/messages/:id', (req, res) => {
    const id = req.params.id
    var validation = validator().validate(id).isNotEmpty()
        .and.matches('^[a-f0-9]{24}$')

    if (validation.hasErrors()) {

        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mongoClient.connect(common.database_uri, options, (err, client) => {
            if (err) {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            } else {
                const db = client.db(database)
                db.collection(MESSAGE_COLL).findOne({ _id: ObjectId(id) }, (err, msg) => {
                    if (err) {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    } else {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', msg))
                        client.close()
                    }
                })
            }
        })
    }
})

// my messages
router.get('/messages/from/:sender', (req, res) => {
    const sender = req.params.sender
    var validation = validator().validate(sender).isNotEmpty()

    if (validation.hasErrors()) {

        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {

        mongoClient.connect(common.database_uri, options, (err, client) => {
            if (err) {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(0, err.message, err))
            } else {
                const db = client.db(database)

                db.collection(MESSAGE_COLL).find({ sender: sender }).toArray((err, tasks) => {
                    if (err) {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    } else {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', tasks))
                        client.close()
                    }
                })
            }
        })
    }
})

// task message
router.get('/messages/task/:id', (req, res) => {
    const id = req.params.id
    var validation = validator().validate(id).isNotEmpty()
        .and.matches('^[a-f0-9]{24}$')

    if (validation.hasErrors()) {

        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mongoClient.connect(common.database_uri, options, (err, client) => {
            if (err) {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            } else {
                const db = client.db(database)
                db.collection(MESSAGE_COLL).findOne({ task: ObjectId(id) }, (err, task) => {
                    if (err) {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    } else {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', task))
                        client.close()
                    }
                })
            }
        })
    }
})


// get messages
router.post('/sendmessage', (req, res) => {
    const message = req.body
    const validation = validateMessage(message)

    if (validation.hasErrors()) {

        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {

        mongoClient.connect(common.database_uri, options, (err, client) => {
            if (err) {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            } else {
                const db = client.db(database)
                db.collection(MESSAGE_COLL).insertOne(message, (err, result) => {
                    if (err) {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    } else {
                        res.status(HttpStatus.CREATED).json(build_response(HttpStatus.CREATED, '', result.insertedId))
                        client.close()
                    }
                })
            }
        })
    }
})

const validateMessage = (message) => {
    const validation = validator()
        .validate(message.title).isNotEmpty()
        .validate(message.description).isNotEmpty()
        .validate(message.rate).isNotNull()
        .validate(message.location.street).isNotEmpty()
        .validate(message.location.city).isNotEmpty()
        .validate(message.location.state).isNotEmpty()
        .validate(message.location.zipcode).isNotEmpty()
        .validate(message.location.country).isNotEmpty()

    return validation
}

module.exports = router