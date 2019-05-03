#!node

'use strict'

import express from 'express'
import dotenv from 'dotenv/config'
import bodyParser from 'body-parser'
import notify_router from './routes/notify_route'
import fs from 'fs'
import path from 'path'
import morgan from 'morgan'
import uuid from 'uuid/v4'

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
const accesslogstream = fs.createWriteStream(path.join(__dirname, log_file), {
    flags: 'a'
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

app.configure('development', () => {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }))
})

app.configure('production', 'staging', () => {
    app.use(express.errorHandler())
})

app.use('/api/', notify_router)

//start the app server
app.listen(port, () => console.log(`task api listening on port ${port}!`))