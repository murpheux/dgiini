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

import auth_router from './routes/auth_route'

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
app.use(cors({ origin: CLIENT_URL }))

// ping
app.get('/api/auth/v1/', (req, res) => {
    let payload = {
        'Service': `${common.app_name} ${common.version} ${common.build}`
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