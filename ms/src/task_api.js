/* eslint-disable no-console */
'use strict'

import config from 'dotenv/config'
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'
import HttpStatus from 'http-status-codes'
import fs from 'fs'
import yaml from 'yaml'
import swaggerui from 'swagger-ui-express'
import asyncHandler from 'express-async-handler'
import { createLightship } from 'lightship'

import winston from './shared/winston'
import common from './shared/common'

import * as gen from './version'
import task_router from './routes/task_route'
import { set_whitelist } from './shared/lib'

// eslint-disable-next-line no-unused-vars
const log_level = process.env.LOG_LEVEL || 'debug'
const log_format = process.env.LOG_FORMAT || 'combined'
const port = process.env.PORT || process.env.TASK_API_PORT

const CLIENT_URL = process.env.COR_CLIENT_URL || 'http://localhost:9000'

const lightship = createLightship()
const app = express()
app.use(compression()) // use compression

if ((process.env.NODE_ENV === 'development') &&
    (fs.existsSync('swagger.yaml')))
{
    const file = fs.readFileSync('swagger.yaml', 'utf8')
    const swagger_config = yaml.parse(file)

    app.use('/api/docs/v1', swaggerui.serve, swaggerui.setup(swagger_config))
}

// check configuration
if (config.error) { throw config.error }

// id for log
const requestId = (req, res, next) => {
    req.id = uuidv4()
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
        if (whitelist.indexOf(origin) !== -1) { callback(null, true) } else { callback(new Error('Request blocked by CORS')) }
    }
}
app.use(cors(corsOptions))

// ping
app.get('/api/task/v1/', asyncHandler(async(req, res) => {
    const payload = {
        'Service': `task ${common.app_name} v${gen.VERSION.semverString || common.version}`
    }
    res.status(HttpStatus.OK).json(payload)
}))

app.use('/api/task/v1/', task_router)

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
const server = app.listen(port, () => {
    lightship.signalReady()
    console.log(`task api listening on port ${port}!`)
})

lightship.registerShutdownHandler(() => { server.close() })
lightship.signalReady()