/* eslint-disable no-console */
'use strict'

import config from 'dotenv/config'
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import uuid from 'uuid/v4'
import HttpStatus from 'http-status-codes'

import winston from './shared/winston'
import common from './shared/common'

import * as gen from './version'
import auth_router from './routes/auth_route'
import { set_whitelist } from './shared/lib'

// eslint-disable-next-line no-unused-vars
const log_level = process.env.LOG_LEVEL || 'debug'
const log_format = process.env.LOG_FORMAT || 'combined'
const port = process.env.PORT || process.env.AUTH_API_PORT

const CLIENT_URL = process.env.COR_CLIENT_URL || 'http://localhost:9000'

const app = express()
app.use(compression()) // use compression

// check configuration
if (config.error) { throw config.error }

// id for log
const requestId = (req, res, next) => {
    req.id = uuid()
    next()
}

morgan.token('id', (req) => { return req.id })

app.use(requestId)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan(log_format, { stream: winston.stream }))

var whitelist = set_whitelist(CLIENT_URL)
var corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) { callback(null, true) } else { callback(new Error('Not allowed by CORS')) }
    }
}
app.use(cors(corsOptions))

// ping
app.get('/api/auth/v1/', (req, res) => {
    let payload = {
        'Service': `auth ${common.app_name} ${gen.VERSION.semverString || common.version}`
    }
    res.status(HttpStatus.OK).json(payload)
})

app.use('/api/auth/v1/', auth_router)

// 404
app.use((req, res) => {
    res.status(HttpStatus.NOT_FOUND)

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'API endpoint does not exist!' })
        return
    }

    // default to plain-text. send()
    res.type('txt').send('API endpoint does not exist!')
})

//start the app server
app.listen(port, () => console.log(`auth api listening on port ${port}!`))