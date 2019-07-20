/* eslint-disable no-unused-vars */
'use strict'

import express from 'express'
import validator from 'fluent-validator'
import HttpStatus from 'http-status-codes'

import common from '../shared/common'
import { build_response, options, build_paging } from '../shared/lib'
import winston from '../shared/winston'

const mgaccess = require('../data/mongo_access')
const router = express.Router()
const database_name = process.env.MESSAGE_DATABASE || 'dg_messagedb'
const MESSAGE_COLL = 'messages'
const VALIDATION_MSG = 'validation errors encountered'

const collections = [MESSAGE_COLL]
mgaccess.setup_database(common.database_uri, database_name, options, collections).then(
    _ => {
        winston.info(`Collection ${collections} created!`)
    },
    err => { winston.error('Error! ', err) }
)

// message
router.get('/messages/:id', (req, res) => {
    const id = req.params.id
    var validation = validator().validate(id).isNotEmpty().and.isMongoObjectId()

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_getone = async() => {
                    var result = await mgaccess.getone(db, MESSAGE_COLL, { _id: id })
                    return result
                }

                invoke_getone().then(
                    message => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', message))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})

router.get('/messages/to/:sender', (req, res) => {
    const sender = req.params.sender
    var validation = validator().validate(sender).isNotEmpty().and.isMongoObjectId()

    const paging = build_paging(req)
    paging.filter = { to: sender }

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_getlist = async() => {
                    var result = await mgaccess.getlist(db, MESSAGE_COLL, paging)
                    return result
                }

                invoke_getlist().then(
                    messages => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', messages))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})

// my messages
router.get('/messages/from/:sender', (req, res) => {
    const sender = req.params.sender
    var validation = validator().validate(sender).isNotEmpty().and.isMongoObjectId()

    const paging = build_paging(req)
    paging.filter = { from: sender }
    paging.sort_keys = { sentdate: -1 } // include by default

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_getlist = async() => {
                    var result = await mgaccess.getlist(db, MESSAGE_COLL, paging)
                    return result
                }

                invoke_getlist().then(
                    messages => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', messages))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})

// user task message
router.get('/messages/task/:taskid/:userid', (req, res) => {
    const taskid = req.params.taskid
    const userid = req.params.userid

    var validation = validator().validate(taskid).isNotNull().and.isNotEmpty().and.isMongoObjectId()
    validation.validate(userid).isNotNull().and.isNotEmpty().and.isMongoObjectId()

    const paging = build_paging(req)
    paging.filter = { 'task': taskid, 'from': userid }
    paging.sort_keys = { sentdate: -1 }

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_getlist = async() => {
                    var result = await mgaccess.getlist(db, MESSAGE_COLL, paging)
                    return result
                }

                invoke_getlist().then(
                    messages => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', messages))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})

// task message
router.get('/messages/task/:id', (req, res) => {
    const id = req.params.id
    var validation = validator().validate(id).isNotNull().and.isNotEmpty().and.isMongoObjectId()

    const paging = build_paging(req)
    paging.filter = { 'task': id }
    paging.sort_keys = { sentdate: -1 }

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_getlist = async() => {
                    var result = await mgaccess.getlist(db, MESSAGE_COLL, paging)
                    return result
                }

                invoke_getlist().then(
                    messages => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', messages))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})

// new message
router.post('/messages/task/:id', (req, res) => {
    const message = req.body
    const validation = validateMessage(message)

    const id = req.params.id
    validation.validate(id).isNotEmpty().isMongoObjectId()

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        //enrich
        message.task = id
        message.isRead = false
        message.sentdate = new Date()

        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_getlist = async() => {
                    var result = await mgaccess.create(db, MESSAGE_COLL, message)
                    return result
                }

                invoke_getlist().then(
                    message => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', message.ops[0]))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})


// get messages
router.post('/sendmessage', (req, res) => {
    const message = req.body
    const validation = validateMessage(message)

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_updateone = async() => {
                    var result = await mgaccess.create(db, MESSAGE_COLL, message)
                    return result
                }

                invoke_updateone().then(
                    tasks => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', tasks))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})

const validateMessage = (message) => {
    const validation = validator()
        .validate(message.from).isNotNull().and.isNotEmpty().and.isMongoObjectId()
        .validate(message.to).isNotNull().and.isNotEmpty().and.isMongoObjectId()
        .validate(message.message).isNotNull().and.isNotEmpty()
        .validate(message.replyto).isNull().or.isMongoObjectId()

    return validation
}

module.exports = router