/* eslint-disable no-unused-vars */
'use strict'

import express from 'express'
import mongodb from 'mongodb'
import asyncHandler from 'express-async-handler'
import common from '../shared/common'
import { options } from '../shared/service.library'
import winston from '../shared/winston'
import mgaccess from '../data/mongo.access'
import { ReviewController } from '../controllers/review'

const router = express.Router()
const database_name = process.env.REVIEW_DATABASE || 'dg_reviewdb'
const ObjectId = mongodb.ObjectId
const REVIEW_COLL = 'reviews'


const collections = [REVIEW_COLL]
mgaccess.setup_database(common.database_uri, database_name, options, collections).then(
    _ => {
        winston.info(`Collection ${collections} created!`)
    },
    err => { winston.error('Error! ', err) }
)

mgaccess.get_connection(common.database_uri, database_name, options).then(connection => {
    const db = connection
    const api = new ReviewController(db)

    router.get('/reviews', asyncHandler(api.get_reviews))
    router.get('/reviews/:id', asyncHandler(api.get_user_reviews))
    router.post('/reviews', asyncHandler(api.save_review))
})

module.exports = router