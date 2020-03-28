/* eslint-disable no-unused-vars */
'use strict'

import express from 'express'
import validator from 'fluent-validator'
import HttpStatus from 'http-status-codes'
import mongodb from 'mongodb'
import asyncHandler from 'express-async-handler'
import common from '../shared/common'
import VALIDATION_MSG from '../shared/error_messages'
import { build_response, options, build_paging, enrich_paging } from '../shared/service.library'
import winston from '../shared/winston'
import { validateBid, validateTask } from '../shared/validator'
import mgaccess from '../data/mongo.access'

const router = express.Router()
const database_name = process.env.TASK_DATABASE || 'dg_taskdb'
const ObjectId = mongodb.ObjectId
const TASK_COLL = 'tasks'
const BID_COLL = 'bids'

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

// task list
router.get('/tasks', asyncHandler(async(req, res, next) => {
    let paging = build_paging(req)
    paging = enrich_paging(paging)

    const db = await mgaccess.get_connection(common.database_uri, database_name, options)
    const invoke_getlist = async() => await mgaccess.getlisttask(db, TASK_COLL, paging)

    const [count, data] = await invoke_getlist()
    const cnt = count.length > 0 ? count[0].count : 0
    res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', cnt, data))
}))

router.get('/tasks/city/:city', asyncHandler(async(req, res, next) => {
    const city = req.params.city

    let paging = build_paging(req)
    paging = enrich_paging(paging)
    paging.filter = { 'location.city': city }

    const db = await mgaccess.get_connection(common.database_uri, database_name, options)
    const invoke_getlist = async() => await mgaccess.getlisttask(db, TASK_COLL, paging)

    const [count, data] = await invoke_getlist()
    const cnt = count.length > 0 ? count[0].count : 0
    res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', cnt, data))
}))

// user task
router.get('/tasks/user/:id', asyncHandler(async(req, res, next) => {
    const id = req.params.id
    var validation = validator().validate(id).isNotEmpty().isMongoObjectId()

    const paging = build_paging(req)
    paging.filter = { 'client.id': id }

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {

        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_getlist = async() => await mgaccess.getlist(db, TASK_COLL, paging)

        const [count, data] = await invoke_getlist()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', count, data))
    }
}))

// task
router.get('/tasks/:id', asyncHandler(async(req, res, next) => {
    const id = req.params.id
    var validation = validator().validate(id).isNotEmpty().isMongoObjectId()

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {

        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_getone = async() => await mgaccess.getonetask(db, TASK_COLL, { _id: id })

        const tasks = await invoke_getone()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, tasks[0]))
    }
}))

router.get('/tasks/stats/full', asyncHandler(async(req, res, next) => {
    const db = await mgaccess.get_connection(common.database_uri, database_name, options)
    const invoke_getstats = async() => await mgaccess.getTaskStatistics(db, TASK_COLL, undefined)

    const tasks = await invoke_getstats()
    res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, tasks[0]))
}))

router.get('/tasks/category/stats', asyncHandler(async(req, res, next) => {
    const db = await mgaccess.get_connection(common.database_uri, database_name, options)
    const invoke_getstats = async() => await mgaccess.getCategoryStatistics(db, TASK_COLL, undefined)

    const tasks = await invoke_getstats()
    res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, tasks))
}))


// update
router.put('/tasks', asyncHandler(async(req, res, next) => {
    const task = req.body
    var validation = validator().validate(task.id).isNotNull().and.isNotEmpty().isMongoObjectId()

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        const id = task.id
        delete task['id']

        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_updateone = async() => await mgaccess.updateone(db, TASK_COLL, id, task)

        const tasks = await invoke_updateone()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', tasks))
    }
}))

// delete
router.delete('/tasks/:id', asyncHandler(async(req, res, next) => {
    const id = req.params.id
    var validation = validator().validate(id).isNotEmpty().isMongoObjectId()

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_updateone = async() => await mgaccess.disable(db, TASK_COLL, id)

        const tasks = await invoke_updateone()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', tasks))
    }
}))

// update 
router.put('/bids', asyncHandler(async(req, res, next) => {
    const bid = req.body
    var validation = validator().validate(bid.id).isNotNull().and.isNotEmpty().isMongoObjectId()

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        const id = bid.id
        delete bid['id']

        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_updateone = async() => await mgaccess.updateone(db, BID_COLL, id, bid)

        const tasks = await invoke_updateone()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', tasks))
    }
}))

// create 
router.post('/bids', asyncHandler(async(req, res, next) => {
    const bid = req.body
    const validation = validateBid(bid)

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        // enrich
        bid.created = new Date()
        bid.user = ObjectId(bid.user)
        bid.task = ObjectId(bid.task)

        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_updateone = async() => await mgaccess.create(db, BID_COLL, bid)

        const task = await invoke_updateone()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', task.ops[0]))
    }

}))

// create 
router.post('/tasks', asyncHandler(async(req, res, next) => {
    const task = req.body
    const validation = validateTask(task)

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        // enrich
        task.status = task_status.OPEN
        task.posted_date = new Date()

        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_updateone = async() => await mgaccess.create(db, TASK_COLL, task)

        const result = await invoke_updateone()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', result.ops[0]))
    }
}))


// task/search
router.get('/tasks/search/:searchstr', asyncHandler(async(req, res, next) => {
    const searchstr = req.params.searchstr

    const paging = build_paging(req)
    paging.filter = { $text: { $search: '"' + searchstr + '"' } }

    const db = await mgaccess.get_connection(common.database_uri, database_name, options)
    const invoke_getlist = async() => await mgaccess.searchTask(db, TASK_COLL, paging)

    const tasks = await invoke_getlist()
    res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, tasks))
}))


router.get('/tasks/:id/search/:searchstr', asyncHandler(async(req, res, next) => {
    const searchstr = req.params.searchstr
    const id = req.params.id

    const paging = build_paging(req)
    paging.filter = { 'client.id': id, title: { $regex: '.*' + searchstr + '.*' } }

    var validation = validator().validate(id).isNotEmpty().isMongoObjectId()

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {

        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_getlist = async() => await mgaccess.getlisttask(db, TASK_COLL, paging)

        const [count, data] = await invoke_getlist()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, data))
    }
}))

// task/category
router.get('/tasks/category/:category', asyncHandler(async(req, res, next) => {
    let categories = req.params.category
    var validation = validator().validate(categories).isNotEmpty()

    categories = JSON.parse(categories)

    categories.forEach(category => {
        category = category.toUpperCase() // titleCase(category)
    })

    const paging = build_paging(req)
    paging.filter = { category: { $in: categories } }

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_getlist = async() => await mgaccess.getlist(db, TASK_COLL, paging)

        const [count, data] = await invoke_getlist()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', count, data))
    }
}))

router.get('/tasks/city/:city/category/:category', asyncHandler(async(req, res, next) => {
    let categories = req.params.category
    let city = req.params.city
    var validation = validator().validate(categories).isNotEmpty()

    categories = JSON.parse(categories)

    categories.forEach(category => {
        category = category.toUpperCase()
    })

    const paging = build_paging(req)
    paging.filter = { 'location.city': city, category: { $in: categories } }

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, 0, validation.getErrors()))
    } else {
        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_getlist = async() => await mgaccess.getlisttask(db, TASK_COLL, paging)

        const [count, data] = await invoke_getlist()
        const cnt = count.length > 0 ? count[0].count : 0
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', cnt, data))
    }
}))

const categories = ['Cleaning', 'Gardening', 'Handy Man', 'Furniture Assembly', 'Lawn Mowing', 'Snow Plowing', 'Childcare', 'Moving', 'Others']

// categories
router.get('/categories', (req, res) => {
    res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, categories))
})

module.exports = router