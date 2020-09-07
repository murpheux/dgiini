/* eslint-disable no-unused-vars */
'use strict'

import HttpStatus from 'http-status-codes'
import mongodb from 'mongodb'
import mgaccess from '../data/mongo.access'
import validator from 'fluent-validator'
import VALIDATION_MSG from '../shared/error_messages'
import { validateBid, validateTask } from '../shared/validator'
import { build_response, build_paging, enrich_paging } from '../shared/service.library'

const ObjectId = mongodb.ObjectId
const categories = ['Cleaning', 'Gardening', 'Handy Man', 'Furniture Assembly', 'Lawn Mowing', 'Snow Plowing', 'Childcare', 'Moving', 'Others']

export class TaskController {
    TASK_COLL = 'tasks'
    BID_COLL = 'bids'

    constructor(dbContext) {
        this.db = dbContext
    }

    get_tasks = async (req, res) => {
        let paging = build_paging(req)
        paging = enrich_paging(paging)
    
        const invoke_getlist = async() => await mgaccess.getlisttask(this.db, this.TASK_COLL, paging)
    
        const [count, data] = await invoke_getlist()
        const cnt = count.length > 0 ? count[0].count : 0
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', cnt, data))
    }

    save_task = async (req, res) => {
        const task = req.body
        const validation = validateTask(task)
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            // enrich
            task.status = 'open'
            task.posted_date = new Date()
    
            const invoke_updateone = async() => await mgaccess.create(this.db, this.TASK_COLL, task)
    
            const result = await invoke_updateone()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', result.ops[0]))
        }
    }

    get_tasks_by_city = async(req, res) => {
        const city = req.params.city
    
        let paging = build_paging(req)
        paging = enrich_paging(paging)
        paging.filter = { 'location.city': city }
    
        const invoke_getlist = async() => await mgaccess.getlisttask(this.db, this.TASK_COLL, paging)
    
        const [count, data] = await invoke_getlist()
        const cnt = count.length > 0 ? count[0].count : 0
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', cnt, data))
    }

    get_user_task = async(req, res) => {
        const id = req.params.id
        var validation = validator().validate(id).isNotEmpty().isMongoObjectId()
    
        const paging = build_paging(req)
        paging.filter = { 'client': id }
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
    
            const invoke_getlist = async() => await mgaccess.getlist(this.db, this.TASK_COLL, paging)
    
            const [count, data] = await invoke_getlist()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', count, data))
        }
    }

    get_task_by_id = async(req, res) => {
        const id = req.params.id
        var validation = validator().validate(id).isNotEmpty().isMongoObjectId()
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
    
            const invoke_getone = async() => await mgaccess.getonetask(this.db, this.TASK_COLL, { _id: id })
    
            const tasks = await invoke_getone()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, tasks[0]))
        }
    }

    get_task_stats_full = async(_req, res) => {
        const invoke_getstats = async() => await mgaccess.getTaskStatistics(this.db, this.TASK_COLL, undefined)
    
        const tasks = await invoke_getstats()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, tasks[0]))
    }

    get_task_stats_by_category = async(_req, res) => {
        const invoke_getstats = async() => await mgaccess.getCategoryStatistics(this.db, this.TASK_COLL, undefined)
    
        const tasks = await invoke_getstats()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, tasks))
    }

    get_user_task_stats_by_status = async(req, res) => {
        const id = req.params.id
        const invoke_getstats = async() => await mgaccess.getUserStatusStatistics(this.db, this.TASK_COLL, id)
    
        const tasks = await invoke_getstats()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, tasks))
    }

    get_task_stats_by_category_and_city = async(req, res) => {
        const city = req.params.city
    
        let paging = build_paging(req)
        paging = enrich_paging(paging)
        paging.filter = { 'location.city': city }

        const invoke_getstats = async() => await mgaccess.getCategoryStatisticsByCity(this.db, this.TASK_COLL, paging)
    
        const tasks = await invoke_getstats()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, tasks))
    }

    update_task = async(req, res) => {
        const task = req.body
        var validation = validator().validate(task.id).isNotNull().and.isNotEmpty().isMongoObjectId()
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            const id = task.id
            task.cancalled_date = new Date()
            delete task['id']
    
            const invoke_updateone = async() => await mgaccess.updateone(this.db, this.TASK_COLL, id, task)
    
            const tasks = await invoke_updateone()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', tasks))
        }
    }

    get_task_by_category = async(req, res) => {
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
            const invoke_getlist = async() => await mgaccess.getlist(this.db, this.TASK_COLL, paging)
    
            const [count, data] = await invoke_getlist()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', count, data))
        }
    }

    delete_task_by_id = async(req, res) => {
        const id = req.params.id
        var validation = validator().validate(id).isNotEmpty().isMongoObjectId()
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            const invoke_updateone = async() => await mgaccess.disable(this.db, this.TASK_COLL, id)
    
            const tasks = await invoke_updateone()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', tasks))
        }
    }

    update_bid = async(req, res) => {
        const bid = req.body
        var validation = validator().validate(bid.id).isNotNull().and.isNotEmpty().isMongoObjectId()
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            const id = bid.id
            delete bid['id']
    
            const invoke_updateone = async() => await mgaccess.updateone(this.db, this.BID_COLL, id, bid)
    
            const tasks = await invoke_updateone()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', tasks))
        }
    }

    create_bid = async(req, res) => {
        const bid = req.body
        const validation = validateBid(bid)
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            // enrich
            bid.created = new Date()
            bid.user = ObjectId(bid.user)
            bid.task = ObjectId(bid.task)
    
            const invoke_updateone = async() => await mgaccess.create(this.db, this.BID_COLL, bid)
    
            const task = await invoke_updateone()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', task.ops[0]))
        }
    }

    search_task = async(req, res) => {
        const searchstr = req.params.searchstr
    
        const paging = build_paging(req)
        paging.filter = { $text: { $search: '"' + searchstr + '"' }, status: { '$nin': ['completed', 'cancelled']} }
    
        const invoke_getlist = async() => await mgaccess.searchTask(this.db, this.TASK_COLL, paging)
    
        const tasks = await invoke_getlist()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, tasks))
    }

    get_task_with_search = async(req, res) => {
        const searchstr = req.params.searchstr
        const id = req.params.id
    
        const paging = build_paging(req)
        paging.filter = { 'client': id, title: { $regex: '.*' + searchstr + '.*' } }
    
        var validation = validator().validate(id).isNotEmpty().isMongoObjectId()
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
    
            const invoke_getlist = async() => await mgaccess.getlisttask(this.db, this.TASK_COLL, paging)
    
            const [count, data] = await invoke_getlist()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, data))
        }
    }

    get_task_by_city_and_category = async(req, res) => {
        let categories = req.params.category
        let city = req.params.city
        var validation = validator().validate(categories).isNotEmpty()
    
        categories = JSON.parse(categories)
    
        categories.forEach(category => {
            category = category.toUpperCase()
        })
    
        const paging = build_paging(req)
        paging.filter = { 'location.city': city, category: { $in: categories }, status: { '$nin': ['completed', 'cancelled']} }
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, 0, validation.getErrors()))
        } else {
            const invoke_getlist = async() => await mgaccess.getlisttask(this.db, this.TASK_COLL, paging)
    
            const [count, data] = await invoke_getlist()
            const cnt = count.length > 0 ? count[0].count : 0
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', cnt, data))
        }
    }

    get_categories = async (_req, res) => {
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, categories))
    }
    
}