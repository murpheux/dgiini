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

// task list
router.get('/tasks', (_, res) => {
    mongoClient.connect(common.database_uri, options, (err, client) => {
        if (err) {
            winston.log(err)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(0, err.message, err))
        } else {
            const db = client.db(database)

            db.collection(TASK_COLL).find().toArray((err, tasks) => {
                if (err) {
                    winston.log(err)
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                } else {
                    res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', tasks))
                    client.close()
                }
            })
        }
    })
})

// task
router.get('/tasks/:id', (req, res) => {
    const id = req.params.id
    var validation = validator().validate(id).isNotEmpty()
        .and.matches('^[a-f0-9]{24}$')

    if (validation.hasErrors()) {

        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mongoClient.connect(common.database_uri, options, (err, client) => {
            if (err) {
                winston.log(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            } else {
                const db = client.db(database)
                db.collection(TASK_COLL).findOne({ _id: ObjectId(id) }, (err, task) => {
                    if (err) {
                        winston.log(err)
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


// update
router.put('/tasks', (req, res) => {
    const task = req.body
    var validation = validator().validate(task.id).isNotNull().and.isNotEmpty()
        .and.matches('^[a-f0-9]{24}$')

    if (validation.hasErrors()) {

        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {

        const id = task.id
        delete task['id']

        mongoClient.connect(common.database_uri, options, (err, client) => {
            if (err) {
                winston.log(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            } else {
                const db = client.db(database)
                db.collection(TASK_COLL).updateOne({ _id: ObjectId(id) }, { $set: task }, (err, result) => {
                    if (err) {
                        winston.log(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    } else {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', result.result.nModified))
                        client.close()
                    }
                })
            }
        })
    }
})

// delete
router.delete('/tasks/:id', (req, res) => {
    const id = req.params.id
    var validation = validator().validate(id).isNotEmpty()
        .matches('^[a-f0-9]{24}$')

    if (validation.hasErrors()) {

        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mongoClient.connect(common.database_uri, options, (err, client) => {
            if (err) {
                winston.log(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            } else {
                const db = client.db(database)
                db.collection(TASK_COLL).deleteOne({ _id: ObjectId(id) }, (err, result) => {
                    if (err) {
                        winston.log(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    } else {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', result.result))
                        client.close()
                    }
                })
            }
        })
    }
})

// create 
router.post('/tasks', (req, res) => {
    const task = req.body
    const validation = validateTask(task)

    if (validation.hasErrors()) {

        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {

        mongoClient.connect(common.database_uri, options, (err, client) => {
            if (err) {
                winston.log(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            } else {
                const db = client.db(database)
                db.collection(TASK_COLL).insertOne(task, (err, result) => {
                    if (err) {
                        winston.log(err)
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

// task
router.get('/tasks/category/:category', (req, res) => {
    let category = req.params.category
    var validation = validator().validate(category).isNotEmpty()

    category = titleCase(category)

    if (validation.hasErrors()) {

        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mongoClient.connect(common.database_uri, options, (err, client) => {
            if (err) {
                winston.log(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            } else {
                const db = client.db(database)
                db.collection(TASK_COLL).find({ category: category }).toArray((err, tasks) => {
                    if (err) {
                        winston.log(err)
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


const categories = ['Cleaning', 'Garden', 'Home', 'HandyMan', 'FurnitureAssembly', 'Mowing', 'SnowPlowing', 'Nursing', 'Childcare', 'Moving', 'Driver', 'Others']

// categories
router.get('/categories', (req, res) => {

    res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', categories))
})

const validateTask = (task) => {
    const validation = validator()
        .validate(task.title).isNotEmpty()
        .validate(task.description).isNotEmpty()
        .validate(task.rate).isNotNull()
        .validate(task.rate.amount).isNumber().and.isPositive()
        .validate(task.location).isNotNull()
        .validate(task.location.street).isNotEmpty()
        .validate(task.location.city).isNotEmpty()
        .validate(task.location.state).isNotEmpty()
        .validate(task.location.zipcode).isNotEmpty()
        .validate(task.location.country).isNotEmpty()

    return validation
}

module.exports = router