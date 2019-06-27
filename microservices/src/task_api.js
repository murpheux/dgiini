/* eslint-disable no-console */
'use strict'

const config = require('dotenv').config()
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const morgan = require('morgan')
var winston = require('./winston')
const uuid = require('uuid/v4')
require('rotating-file-stream')
const HttpStatus = require('http-status-codes')
const common = require('./shared/common')
const cors = require('cors')

const task_router = require('./routes/task_route')
const taskphoto_router = require('./routes/taskphoto_route')

// eslint-disable-next-line no-unused-vars
const log_level = process.env.LOG_LEVEL || 'debug'
const log_format = process.env.LOG_FORMAT || 'combined'
    //const log_file = process.env.LOG_TARGET || 'logfile.log'
const port = process.env.PORT || process.env.TASK_API_PORT

const app = express()
app.use(compression()) // use compression

// check configuration
if (config.error) {
    throw config.error
}

// id for log
const assignId = (req, res, next) => {
    req.id = uuid()
    next()
}

morgan.token('id', (req) => {
    return req.id
})

app.use(assignId)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(morgan(log_format, {
    stream: winston.stream
}))

app.use(cors({ origin: 'http://localhost:4200' }))

// ping
app.get('/api/', (req, res) => {
    let payload = {
        'Service': `${common.app_name} ${common.version} ${common.build}`
    }
    res.status(HttpStatus.OK).json(payload)
})

app.use('/api/', task_router)
app.use('/api/', taskphoto_router)

app.use((req, res, next) => {
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
app.listen(port, () => console.log(`task api listening on port ${port}!`))