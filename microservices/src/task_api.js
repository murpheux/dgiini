/* eslint-disable no-console */
'use strict'

require('dotenv').config()
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
    // const fs = require('fs')
const rfs = require('rotating-file-stream')
const path = require('path')
const morgan = require('morgan')
require('uuid/v4')
require('rotating-file-stream')

const task_router = require('./routes/task_route')
const taskphoto_router = require('./routes/taskphoto_route')

// eslint-disable-next-line no-unused-vars
const log_level = process.env.LOG_LEVEL || 'debug'
const log_format = process.env.LOG_FORMAT || 'combined'
const log_file = process.env.LOG_TARGET || 'logfile.log'
const port = process.env.PORT || process.env.APP_PORT

const app = express()
app.use(compression()) // use compression

const assignId = (req, res, next) => {
    req.id = uuid()
    next()
}

morgan.token('id', (req) => {
    return req.id
})

// create a write stream (in append mode)
// const accesslogstream = fs.createWriteStream(path.join(__dirname, log_file), {
//     flags: 'a'
// })

const accesslogstream = rfs(path.join(__dirname, log_file), {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
})

app.use(assignId)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(morgan(log_format, {
    stream: process.stdout
}))

app.use(morgan(log_format, {
    stream: accesslogstream
}))

app.use('/api/', task_router)
app.use('/api/', taskphoto_router)

//start the app server
app.listen(port, () => console.log(`task api listening on port ${port}!`))