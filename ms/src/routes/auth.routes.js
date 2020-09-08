/* eslint-disable no-unused-vars */
'use strict'

import express from 'express'
import validator from 'fluent-validator'
import asyncHandler from 'express-async-handler'

import common from '../shared/common'
import { options } from '../shared/service.library'
import winston from '../shared/winston'
import mgaccess from '../data/mongo.access'
import { AuthenticationController } from '../controllers/auth'

const router = express.Router()
const database_name = process.env.AUTH_DATABASE || 'dg_authdb'
const USER_COLL = 'users'

const collections = [USER_COLL]
mgaccess.setup_database(common.database_uri, database_name, options, collections).then(
    _ => {
        winston.info(`Collection ${collections} created!`)
    },
    err => { winston.error('Error! ', err) }
)

mgaccess.get_connection(common.database_uri, database_name, options).then(connection => {
    const db = connection
    const api = new AuthenticationController(db)

    // router.post('/login', asyncHandler(api.login))
    router.post('/users', asyncHandler(api.register))
    router.put('/users/promote', asyncHandler(api.promote))
    router.get('/users', asyncHandler(api.user_list))
    router.get('/users/stats/full', asyncHandler(api.user_stats))
    router.get('/users/role/:role', asyncHandler(api.user_by_role))
    router.get('/taskers/:skill', asyncHandler(api.tasker_by_skill))
    router.get('/users/:username', asyncHandler(api.get_user))
    router.get('/usersx/:username', asyncHandler(api.get_user_ex))
    router.put('/users', asyncHandler(api.update_user))
    router.delete('/users/:id', asyncHandler(api.delete_user))
    router.post('/users/client', asyncHandler(api.create_user))
    router.get('/findcity/:ip', asyncHandler(api.find_city_by_ip))
})

module.exports = router