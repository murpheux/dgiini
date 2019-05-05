#!node

'use strict'

import express from 'express'
import mongoose from 'mongoose'
import taskphoto_schema from '../data_schema/taskphoto_schema'
import construct_output from './lib'
import { database_uri } from './common'

const router = express.Router()
mongoose.connect(database_uri, { useCreateIndex: true, useNewUrlParser: true })
const photo = mongoose.model('photo', taskphoto_schema)

//taskphotos
router.get('/task/photo/:id', (req, res) => {
    photo.find({ _id: req.params.id }, (err, photos) => {
        if (err) return console.error(err)

        construct_output(res, 0, '', photos)
    })
})

router.get('/task/photos/:id', (req, res) => {
    photo.find({ task: req.params.id }, (err, photos) => {
        if (err) return console.error(err)

        construct_output(res, 0, '', photos)
    })
})

router.put('/task/photo', (req, res) => {
    let task = new photo(req.body)

    task.save((err, tk) => {
        if (err) return console.error(err)

        construct_output(res, 0, '', tk._id)
    })
})

export default router