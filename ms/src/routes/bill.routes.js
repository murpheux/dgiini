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

module.exports = router