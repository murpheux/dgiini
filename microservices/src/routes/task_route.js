#!node

'use strict'

import express from 'express'
import mongoose from 'mongoose'
import task_schema from '../data_schema/task_schema'

const router = express.Router()

const app_name = process.env.APP_NAME
const version = process.env.APP_VERSION
const build = process.env.APP_BUILD

const database_host = process.env.DB_HOST || 'localhost'
const database = process.env.TASK_DATABASE || 'nodata'

const database_uri = `mongodb://${database_host}/${database}`

mongoose.connect(database_uri, {
    useCreateIndex: true,
    useNewUrlParser: true
})

const task_model = mongoose.model('task', task_schema)

//
router.get('/', (req, res) => {
    let payload = {
        'Service': `${app_name} ${version} ${build}`
    }

    res.json(payload)
})

//tasks
router.get('/task', (req, res) => {
    task_model.find((err, tasks) => {
        if (err) return console.error(err)

        construct_output(res, 0, '', tasks)
    })
})

router.get('/task/:id', (req, res) => {
    task_model.find({ _id: req.params.id }, (err, tasks) => {
        if (err) return console.error(err)

        construct_output(res, 0, '', tasks)
    })
})

router.post('/find/task', (req, res) => {
    let search_str = req.body

    if ('paging' in search_str) {
        const paging = req.body.paging
        const skip = (paging.pagenumber - 1) * paging.nperpage
        const limit = paging.nperpage

        console.log(`skip === ${skip}`)

        // remove payload
        delete search_str['paging']

        task_model.find(search_str, (err, tasks) => {
            if (err) return console.error(err)

            construct_output(res, 0, '', tasks)
        }).skip(skip + 1).limit(limit)
    } else {

        task_model.find(search_str, (err, tasks) => {
            if (err) return console.error(err)

            construct_output(res, 0, '', tasks)
        })
    }
})

router.put('/task', (req, res) => {
    let task = new task_model(req.body)

    task.save((err, tk) => {
        if (err) return console.error(err)

        construct_output(res, 0, '', tk)
    })
})

const construct_output = (res, code, desc, payload) => {
    const json = {
        'code': code,
        'description': desc,
        'payload': payload
    }

    res.json(json)
}

export default router