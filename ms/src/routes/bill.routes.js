/* eslint-disable no-unused-vars */
'use strict'

import express from 'express'

import validator from 'fluent-validator'
import HttpStatus from 'http-status-codes'
import titleCase from 'title-case'
import mongodb from 'mongodb'
import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'
import sendgridmail from '@sendgrid/mail'
import { MessageController } from '../controllers/msg'

import common from '../shared/common'
import { validateCard } from '../shared/validator'
import VALIDATION_MSG from '../shared/error_messages'
import { build_response, options, build_paging, enrich_paging } from '../shared/service.library'
import winston from '../shared/winston'
import mgaccess from '../data/mongo.access'

const router = express.Router()
const database_name = process.env.BILL_DATABASE || 'dg_billdb'
const ObjectId = mongodb.ObjectId
const BILL_COLL = 'bill'


const collections = [BILL_COLL]
mgaccess.setup_database(common.database_uri, database_name, options, collections).then(
    _ => {
        winston.info(`Collection ${collections} created!`)
    },
    err => { winston.error('Error! ', err) }
)

mgaccess.get_connection(common.database_uri, database_name, options).then(connection => {
    const db = connection
    const api = new MessageController(db)

    router.post('/cards', asyncHandler(api.add_card))
    router.get('/card/:cardno', asyncHandler(api.get_card))
    router.post('/billcard', asyncHandler(api.bill_card))
})

module.exports = router