/* eslint-disable no-unused-vars */
'use strict'

import express from 'express'

import mongodb from 'mongodb'
import asyncHandler from 'express-async-handler'
import { NotifyController } from '../controllers/notify'

import common from '../shared/common'
import { options } from '../shared/service.library'
import winston from '../shared/winston'
import mgaccess from '../data/mongo.access'

const router = express.Router()
const database_name = process.env.NOTIFY_DATABASE || 'dg_notifydb'
const ObjectId = mongodb.ObjectId
const NOTIFY_COLL = 'notify'


const collections = [NOTIFY_COLL]
mgaccess.setup_database(common.database_uri, database_name, options, collections).then(
    _ => {
        winston.info(`Collection ${collections} created!`)
    },
    err => { winston.error('Error! ', err) }
)

mgaccess.get_connection(common.database_uri, database_name, options).then(connection => {
    const db = connection
    const api = new NotifyController(db)

    router.post('/sendmail', asyncHandler(api.send_mail))
    router.post('/sendgrid', asyncHandler(api.send_grid))
})

module.exports = router