#!node

'use strict'

import express from 'express'
import mongoose from 'mongoose'
import task_schema from '../data_schema/task_schema'
import construct_output from './lib'
import { app_name, version, build, database_uri } from './common'

const router = express.Router()
mongoose.connect(database_uri, { useCreateIndex: true, useNewUrlParser: true })
const task = mongoose.model('task', task_schema)

//
router.get('/', (req, res) => {
    let payload = {
        'Service': `${app_name} ${version} ${build}`
    }

    res.json(payload)
})

//tasks
router.get('/task', (req, res) => {
    task.find((err, tasks) => {
        if (err) return console.error(err)

        construct_output(res, 0, '', tasks)
    })
})

router.get('/task/:id', (req, res) => {
    task.find({ _id: req.params.id }, (err, tasks) => {
        if (err) return console.error(err)

        construct_output(res, 0, '', tasks)
    })
})

// router.delete('/task2/:id', (req, res) => {
//     task.findOneAndUpdate({ _id: req.param.id }, {
//             status: false // field:values to update
//         }, {
//             new: true, // return updated doc
//             runValidators: true // validate before update
//         })
//         .then(doc => { construct_output(res, 0, '', {}) })
//         .catch(err => { console.error(err) })
// })

router.patch('/task/:id', (req, res) => {
    task.update({ _id: req.params.id }, req.body, { multi: true }, (err, numberAffected) => {
        construct_output(res, 0, '', numberAffected)
    })
})

router.delete('/task/:id', (req, res) => {
    task.update({ _id: req.params.id }, { status: false }, { multi: true }, (err, numberAffected) => {
        construct_output(res, 0, '', numberAffected)
    })
})

router.post('/find/task', (req, res) => {
    let search_str = req.body

    if ('paging' in search_str) {
        const paging = req.body.paging
        const skip = (paging.pagenumber - 1) * paging.nperpage
        const limit = paging.nperpage

        // remove payload
        delete search_str['paging']

        task.find(search_str, (err, tasks) => {
            if (err) return console.error(err)

            construct_output(res, 0, '', tasks)
        }).skip(skip + 1).limit(limit)
    } else {

        task.find(search_str, (err, tasks) => {
            if (err) return console.error(err)

            construct_output(res, 0, '', tasks)
        })
    }
})

router.put('/task', (req, res) => {
    let task = new task(req.body)

    task.save((err, tk) => {
        if (err) return console.error(err)

        construct_output(res, 0, '', tk._id)
    })
})

export default router