'use strict'

const express = require('express')
require('./lib')
const common = require('./common')
const mongoClient = require('mongodb').MongoClient

const router = express.Router()
mongoClient.connect(common.database_uri)

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

module.exports = router