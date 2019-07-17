'use strict'

import express from 'express'
import validator from 'fluent-validator'
import HttpStatus from 'http-status-codes'
import nodemailer from 'nodemailer'

import common from '../shared/common'
import build_response from '../shared/lib'
import winston from '../winston'

const router = express.Router()
const VALIDATION_MSG = 'validation errors encountered'

// send mail
router.post('/sendmail', (req, res) => {
    const mail = req.body
    const validation = validateMail(mail)

    if (validation.hasErrors()) {

        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        send_mail(mail)
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', mail.messageId))
    }
})

const validateMail = (mail) => {
    const validation = validator()
        .validate(mail.subject).isNotNull().and.isNotEmpty()
        .validate(mail.body).isNotNull().and.isNotEmpty()
        .validate(mail.html).isNotNull().and.isNotEmpty()
        .validate(mail.from).isNotNull().and.isNotEmpty().and.isEmail()
        .validate(mail.to).isNotEmpty().and.isNotEmpty()

    return validation
}

const send_mail = async(mail) => {
    // const testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        service: common.smtp_service,
        // host: common.smtp_host,
        // port: common.smtp_port,
        // secure: common.smtp_ssl,
        auth: {
            user: common.smtp_user,
            pass: common.smtp_password
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

    winston.info('Message sent: %s', response.messageId)
    winston.info('Preview URL: %s', nodemailer.getTestMessageUrl(response))
}

module.exports = router