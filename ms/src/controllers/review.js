/* eslint-disable no-unused-vars */
'use strict'

import HttpStatus from 'http-status-codes'
import mongodb from 'mongodb'
import mgaccess from '../data/mongo.access'
import validator from 'fluent-validator'
import VALIDATION_MSG from '../shared/error_messages'
import { validateReview } from '../shared/validator'
import { build_response, build_paging, enrich_paging } from '../shared/service.library'

const ObjectId = mongodb.ObjectId

export class ReviewController {
    REVIEW_COLL = 'reviews'

    constructor(dbContext) {
        this.db = dbContext
    }

    get_reviews = async (req, res) => {
        let paging = build_paging(req)
        paging = enrich_paging(paging)
    
        const invoke_getlist = async() => await mgaccess.getlist(this.db, this.REVIEW_COLL, paging)
    
        const [count, data] = await invoke_getlist()
        const cnt = count.length > 0 ? count[0].count : 0
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', cnt, data))
    }

    get_user_reviews = async (req, res) => {
        const id = req.params.id

        let paging = build_paging(req)
        paging.filter = { 'to': ObjectId(id) }
    
        const invoke_getlist = async() => await mgaccess.getlist(this.db, this.REVIEW_COLL, paging)
    
        const [count, data] = await invoke_getlist()
        const cnt = count.length > 0 ? count[0].count : 0
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', cnt, data))
    }

    save_review = async (req, res) => {
        const review = req.body
        const validation = validateReview(review)
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            // enrich
            review.posted_date = new Date()
            const invoke_updateone = async() => await mgaccess.create(this.db, this.REVIEW_COLL, review)
    
            const result = await invoke_updateone()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', result.ops[0]))
        }
    }
}