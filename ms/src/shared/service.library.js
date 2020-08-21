'use strict'

import fs from 'fs'
import yaml from 'yaml'
import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import bodyParser from 'body-parser'
import compression from 'compression'
import swaggerui from 'swagger-ui-express'
import HttpStatus from 'http-status-codes'
import asyncHandler from 'express-async-handler'
import health_check from '../routes/healthcheck.routes'

import winston from './winston'
import * as gen from '../version'
import common from './common'

const CLIENT_URL = process.env.COR_CLIENT_URL || 'http://localhost:8080'
const log_format = process.env.LOG_FORMAT || 'combined'

export const options = {
    poolSize: 20,
    socketTimeoutMS: 480000,
    keepAlive: 300000,
    sslValidate: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

export const build_response = (code, desc, count, data) => {
    const json = {
        'code': code,
        'description': desc,
        'payload': {
            'count': count,
            'data': data
        }
    }

    return json
}

export const build_paging = req => {
    return {
        order_dir: req.query.dir,
        sort_keys: req.query.sort_keys,
        filter: JSON.parse(req.query.filter || '{}'),
        page: parseInt(req.query.page) || 1,
        page_limit: parseInt(req.query.pagelimit) || 40,
        lastid: req.query.lastid
    }
}

export const enrich_paging = (paging) => {

    if (paging.page_limit === 0) {
        paging.page_limit = 100
    }

    if (paging.page === 0) {
        paging.page = 1
    }

    if (!paging.sort_keys) {
        paging.sort_keys = '_id'
    }

    return paging
}

export const set_whitelist = (client_url) => {
    var whitelist = client_url.split(',')

    if (process.env.NODE_ENV === 'development') {
        whitelist.push(undefined) // for postman
    }

    console.log(whitelist)
    return whitelist
}

export const create_app_server = (app_name) => {

    const app = express()
    app.use(compression()) // use compression

    if ((process.env.NODE_ENV === 'development') &&
        (fs.existsSync('swagger.yaml')))
    {
        const file = fs.readFileSync('swagger.yaml', 'utf8')
        const swagger_config = yaml.parse(file)

        app.use('/api/docs/v1', swaggerui.serve, swaggerui.setup(swagger_config))
    }

    // id for log
    const requestId = (req, res, next) => {
        req.id = uuidv4()
        next()
    }

    morgan.token('id', (req) => { return req.id })

    app.use(requestId)
    app.use(bodyParser.json({ limit: '10mb', extended: true }))
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

    app.use(morgan(log_format, { stream: winston.stream }))

    var whitelist = set_whitelist(CLIENT_URL)
    var corsOptions = {
        origin: (origin, callback) => {
            if (whitelist.indexOf(origin) !== -1) { callback(null, true) } else { callback(new Error('Request blocked by CORS')) }
        }
    }

    app.use(cors(corsOptions))
    app.use('/healthcheck', health_check)

    // ping
    app.get(`/api/${app_name}/v1/`, asyncHandler(async(req, res) => {
        const payload = {
            'Service': `${app_name} ${common.app_name} v${gen.VERSION.semverString || common.version}`
        }
        res.status(HttpStatus.OK).json(payload)
    }))

    return app
}

export const not_found = async (req, res) => {
    res.status(HttpStatus.NOT_FOUND)

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'API endpoint does not exist!' })
        return
    }

    // default to plain-text. send()
    res.type('txt').send('API endpoint does not exist!')
}

export const authorize = (req, res, next) => {
    // Do nothing. Defer to GW
    if (req.user !== '') {
        next()
    } else {
        res.status(HttpStatus.FORBIDDEN).send({ error: 'Forbidden!' })
    }
}