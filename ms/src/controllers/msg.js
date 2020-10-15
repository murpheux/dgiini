/* eslint-disable no-unused-vars */
'use strict'

import validator from 'fluent-validator'
import HttpStatus from 'http-status-codes'
import { validateMessage } from '../shared/validator'
import { build_response, build_paging } from '../shared/service.library'

import mgaccess from '../data/mongo.access'

const VALIDATION_MSG = 'validation errors encountered'

export class MessageController {
    MESSAGE_COLL = 'messages'

    constructor(dbContext) {
        this.db = dbContext
    }

    get_messages_by_id = async(req, res) => {
        const id = req.params.id
        var validation = validator().validate(id).isNotNull().and.isNotEmpty().and.isMongoObjectId()
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            const invoke_getone = async() => await mgaccess.get_one(this.db, this.MESSAGE_COLL, { _id: id })
    
            const message = await invoke_getone()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, message))
        }
    }

    get_receiver_messages = async(req, res) => {
        const sender = req.params.sender
        var validation = validator().validate(sender).isNotEmpty().and.isMongoObjectId()
    
        const paging = build_paging(req)
        paging.filter = { to: sender }
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            const invoke_getlist = async() => await mgaccess.get_list(this.db, this.MESSAGE_COLL, paging)
    
            const [count, data] = await invoke_getlist()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', count, data))
        }
    }

    get_sender_messages = async(req, res) => {
        const sender = req.params.sender
        var validation = validator().validate(sender).isNotEmpty().and.isMongoObjectId()
    
        const paging = build_paging(req)
        paging.filter = { from: sender }
        paging.sort_keys = { sentdate: -1 } // include by default
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            const invoke_getlist = async() => await mgaccess.get_list(this.db, this.MESSAGE_COLL, paging)
    
            const [count, data] = await invoke_getlist()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', count, data))
        }
    }

    get_user_task_messages = async(req, res) => {
        const taskid = req.params.taskid
        const userid = req.params.userid
    
        var validation = validator().validate(taskid).isNotNull().and.isNotEmpty().and.isMongoObjectId()
        validation.validate(userid).isNotNull().and.isNotEmpty().and.isMongoObjectId()
    
        const paging = build_paging(req)
        paging.filter = { 'task': taskid, 'from': userid }
        paging.sort_keys = { sentdate: -1 }
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            const invoke_getlist = async() => await mgaccess.get_list(this.db, this.MESSAGE_COLL, paging)
    
            const [count, data] = await invoke_getlist()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', count, data))
        }
    }

    get_task_messages = async(req, res) => {
        const id = req.params.id
        var validation = validator().validate(id).isNotNull().and.isNotEmpty().and.isMongoObjectId()
    
        const paging = build_paging(req)
        paging.filter = { 'task': id }
        paging.sort_keys = { sentdate: -1 }
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            const invoke_getlist = async() => await mgaccess.get_list(this.db, this.MESSAGE_COLL, paging)
    
            const [count, data] = await invoke_getlist()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', count, data))
        }
    }

    create_new_task_message = async(req, res) => {
        const message = req.body
        const validation = validateMessage(message)
    
        const id = req.params.id
        validation.validate(id).isNotEmpty().isMongoObjectId()
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            //enrich
            message.task = id
            message.isRead = false
            message.sentdate = new Date()
    
            const invoke_getlist = async() => await mgaccess.create(this.db, this.MESSAGE_COLL, message)
    
            const result = await invoke_getlist()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, result.ops[0]))
        }
    }

    send_message = async(req, res) => {
        const message = req.body
        const validation = validateMessage(message)
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            const invoke_updateone = async() => await mgaccess.create(this.db, this.MESSAGE_COLL, message)
    
            const message = await invoke_updateone()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, message))
        }
    }

}