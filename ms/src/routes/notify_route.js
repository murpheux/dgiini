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
import VALIDATION_MSG from '../shared/error_messages'
import { build_response, options, build_paging, enrich_paging } from '../shared/lib'
import winston from '../shared/winston'

const mgaccess = require('../data/mongo_access')
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

// send mail
router.post('/sendmail', (req, res) => {
    const mail = req.body
    const validation = validateMail(mail)

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, 0, validation.getErrors()))
    } else {
        send_mail(mail)
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, {}))
    }
})

// sendgrid
router.post('/sendgrid', (req, res) => {
    const mail = req.body
    const validation = validateMail(mail)

    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    sendgridmail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: mail.to,
        from: mail.from,
        subject: mail.subject,
        text: mail.body,
        //html: mail.body,
    }

    sendgridmail.send(msg)
    res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, {}))
})

const validateMail = (mail) => {
    const validation = validator()
        .validate(mail.subject).isNotNull().and.isNotEmpty()
        .validate(mail.body).isNotNull().and.isNotEmpty()
        .validate(mail.from).isNotNull().and.isNotEmpty().and.isEmail()
        .validate(mail.to).isNotEmpty().and.isNotEmpty()

    return validation
}

const send_mail = async(mail) => {
    // const testAccount = await nodemailer.createTestAccount()
    const buffer = Buffer.from(common.smtp_password, 'base64')
    const smtp_password = buffer.toString('ascii')
    console.log(smtp_password)

    const transporter = nodemailer.createTransport({
        service: common.smtp_service,
        host: common.smtp_host,
        port: common.smtp_port,
        secure: common.smtp_ssl,
        auth: {
            user: common.smtp_user,
            pass: smtp_password
        }
    })

    const options = {
        from: mail.from,
        to: mail.to,
        subject: mail.subject,
        text: mail.body,
        html: mail.html
    }

    const response = await transporter.sendMail(options, (error, info) => {
        if (error) {
            winston.error(error)
        } else {
            winston.info('Email sent: ' + info.response)
        }
    })

    // winston.info('Message sent: %s', response.messageId)
    // winston.info('Preview URL: %s', nodemailer.getTestMessageUrl(response))
}

module.exports = router