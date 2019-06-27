/* eslint-disable no-console */
'use strict'

const express = require('express')
require('../shared/lib').default
const common = require('../shared/common')

const router = express.Router()

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