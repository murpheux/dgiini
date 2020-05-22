/* eslint-disable no-unused-vars */
'use strict'

import express from 'express'
import mongodb from 'mongodb'
import asyncHandler from 'express-async-handler'
import common from '../shared/common'
import { options } from '../shared/service.library'
import winston from '../shared/winston'
import mgaccess from '../data/mongo.access'
import { TaskController } from '../controllers/task'

const router = express.Router()
const database_name = process.env.TASK_DATABASE || 'dg_taskdb'
const ObjectId = mongodb.ObjectId
const TASK_COLL = 'tasks'

const task_status = {
    OPEN: 'open',
    ASSIGNED: 'assigned',
    CANCELLED: 'cancelled',
    COMPLETE: 'complete'
}

const collections = [TASK_COLL]
mgaccess.setup_database(common.database_uri, database_name, options, collections).then(
    _ => {
        winston.info(`Collection ${collections} created!`)
    },
    err => { winston.error('Error! ', err) }
)

mgaccess.get_connection(common.database_uri, database_name, options).then(connection => {
    const db = connection
    const api = new TaskController(db)

    router.get('/tasks', asyncHandler(api.get_tasks))
    router.post('/tasks', asyncHandler(api.save_task))
    router.get('/tasks/city/:city', asyncHandler(api.get_tasks_by_city))
    router.get('/tasks/user/:id', asyncHandler(api.get_user_task))
    router.get('/tasks/:id', asyncHandler(api.get_task_by_id))
    router.get('/tasks/stats/full', asyncHandler(api.get_task_stats_full))
    router.get('/tasks/category/stats', asyncHandler(api.get_task_stats_by_category))
    router.get('/tasks/category/stats/:city', asyncHandler(api.get_task_stats_by_category_and_city))
    router.put('/tasks', asyncHandler(api.update_task))
    router.get('/tasks/category/:category', asyncHandler(api.get_task_by_category))
    router.delete('/tasks/:id', asyncHandler(api.delete_task_by_id))
    router.put('/bids', asyncHandler(api.update_bid))
    router.post('/bids', asyncHandler(api.create_bid))
    router.get('/tasks/search/:searchstr', asyncHandler(api.search_task))
    router.get('/tasks/:id/search/:searchstr', asyncHandler(api.get_task_with_search))
    router.get('/tasks/city/:city/category/:category', asyncHandler(api.get_task_by_city_and_category))
    router.get('/categories', asyncHandler(api.get_categories))
})

module.exports = router