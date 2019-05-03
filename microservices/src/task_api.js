#!node

/* eslint-disable no-console */
'use strict'

import express from 'express'
// eslint-disable-next-line no-unused-vars
import _ from 'dotenv/config'
import bodyParser from 'body-parser'
import task_router from './routes/task_route'
//import fs from 'fs'
import path from 'path'
import morgan from 'morgan'
import uuid from 'uuid/v4'
import rfs from 'rotating-file-stream'

// eslint-disable-next-line no-unused-vars
const log_level = process.env.LOG_LEVEL || 'debug'
const log_format = process.env.LOG_FORMAT || 'combined'
const log_file = process.env.LOG_TARGET || 'logfile.log'
const port = process.env.PORT || process.env.APP_PORT

const app = express()

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

//start the app server
app.listen(port, () => console.log(`task api listening on port ${port}!`))