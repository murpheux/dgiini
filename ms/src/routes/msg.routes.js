/* eslint-disable no-unused-vars */
'use strict'

import express from 'express'
import asyncHandler from 'express-async-handler'

import common from '../shared/common'
import { options } from '../shared/service.library'
import winston from '../shared/winston'
import mgaccess from '../data/mongo.access'
import { MessageController } from '../controllers/msg'

const router = express.Router()
const database_name = process.env.MESSAGE_DATABASE || 'dg_messagedb'
const MESSAGE_COLL = 'messages'

const collections = [MESSAGE_COLL]
mgaccess.setup_database(common.database_uri, database_name, options, collections).then(
    _ => {
        winston.info(`Collection ${collections} created!`)
    },
    err => { winston.error('Error! ', err) }
)

mgaccess.get_connection(common.database_uri, database_name, options).then(connection => {
    const db = connection
    const api = new MessageController(db)

    router.get('/messages/:id', asyncHandler(api.get_messages_by_id))
    router.get('/messages/to/:sender', asyncHandler(api.get_receiver_messages))
    router.get('/messages/from/:sender', asyncHandler(api.get_sender_messages))
    router.get('/messages/task/:taskid/:userid', asyncHandler(api.get_user_task_messages))
    router.get('/messages/task/:id', asyncHandler(api.get_user_task_messages))
    router.post('/messages/task/:id', asyncHandler(api.create_new_task_message))
    router.post('/sendmessage', asyncHandler(api.send_message))
})

module.exports = router