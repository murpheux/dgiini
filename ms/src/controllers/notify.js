/* eslint-disable no-unused-vars */
'use strict'

import HttpStatus from 'http-status-codes'
import sendgridmail from '@sendgrid/mail'

import common from '../shared/common'
import nodemailer from 'nodemailer'
import { validateMail } from '../shared/validator'
import VALIDATION_MSG from '../shared/error_messages'
import winston from '../shared/winston'
import { build_response } from '../shared/service.library'

export class NotifyController {

    constructor(dbContext) {
        this.db = dbContext
    }

    send_mail = async (req, res) => {
        const mail = req.body
        const validation = validateMail(mail)
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, 0, validation.getErrors()))
        } else {
            this.send_mailx(mail)
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, {}))
        }
    }

    send_mailx = async (mail) => {
        // const testAccount = await nodemailer.createTestAccount()
        const buffer = Buffer.from(common.smtp_password, 'base64')
        const smtp_password = buffer.toString('ascii')
    
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

    send_grid = async (req, res) => {
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
    }

}