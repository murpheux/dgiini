/* eslint-disable no-unused-vars */
'use strict'

import express from 'express'
import validator from 'fluent-validator'
import HttpStatus from 'http-status-codes'
import asyncHandler from 'express-async-handler'

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
router.get('/messages/:id', asyncHandler(async(req, res, next) => {
    const id = req.params.id
    var validation = validator().validate(id).isNotEmpty().and.isMongoObjectId()

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_getone = async() => await mgaccess.getone(db, MESSAGE_COLL, { _id: id })

        const message = await invoke_getone()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', message))
    }
}))

router.get('/messages/to/:sender', asyncHandler(async(req, res, next) => {
    const sender = req.params.sender
    var validation = validator().validate(sender).isNotEmpty().and.isMongoObjectId()

    const paging = build_paging(req)
    paging.filter = { to: sender }

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_getlist = async() => await mgaccess.getlist(db, MESSAGE_COLL, paging)

        const messages = await invoke_getlist()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', messages))
    }
}))

// my messages
router.get('/messages/from/:sender', asyncHandler(async(req, res, next) => {
    const sender = req.params.sender
    var validation = validator().validate(sender).isNotEmpty().and.isMongoObjectId()

    const paging = build_paging(req)
    paging.filter = { from: sender }
    paging.sort_keys = { sentdate: -1 } // include by default

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_getlist = async() => await mgaccess.getlist(db, MESSAGE_COLL, paging)

        const messages = await invoke_getlist()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', messages))
    }
}))

// user task message
router.get('/messages/task/:taskid/:userid', asyncHandler(async(req, res, next) => {
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
        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_getlist = async() => await mgaccess.getlist(db, MESSAGE_COLL, paging)

        const messages = await invoke_getlist()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', messages))
    }
}))

// task message
router.get('/messages/task/:id', asyncHandler(async(req, res, next) => {
    const id = req.params.id
    var validation = validator().validate(id).isNotNull().and.isNotEmpty().and.isMongoObjectId()

    const paging = build_paging(req)
    paging.filter = { 'task': id }
    paging.sort_keys = { sentdate: -1 }

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_getlist = async() => await mgaccess.getlist(db, MESSAGE_COLL, paging)

        const messages = await invoke_getlist()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', messages))
    }
}))

// new message
router.post('/messages/task/:id', asyncHandler(async(req, res, next) => {
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

        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_getlist = async() => await mgaccess.create(db, MESSAGE_COLL, message)

        const message = await invoke_getlist()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', message.ops[0]))
    }
}))


// get messages
router.post('/sendmessage', asyncHandler(async(req, res, next) => {
    const message = req.body
    const validation = validateMessage(message)

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_updateone = async() => await mgaccess.create(db, MESSAGE_COLL, message)

        const message = await invoke_updateone()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', message))
    }
}))

const validateMessage = (message) => {
    const validation = validator()
        .validate(message.from).isNotNull().and.isNotEmpty().and.isMongoObjectId()
        .validate(message.to).isNotNull().and.isNotEmpty().and.isMongoObjectId()
        .validate(message.message).isNotNull().and.isNotEmpty()
        .validate(message.replyto).isNull().or.isMongoObjectId()

    return validation
}

module.exports = router