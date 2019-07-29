/* eslint-disable no-unused-vars */
'use strict'

import express from 'express'

import validator from 'fluent-validator'
import HttpStatus from 'http-status-codes'
import titleCase from 'title-case'
import mongodb from 'mongodb'

import common from '../shared/common'
import VALIDATION_MSG from '../shared/error_messages'
import { build_response, options, build_paging, enrich_paging } from '../shared/lib'
import winston from '../shared/winston'

const mgaccess = require('../data/mongo_access')
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
router.get('/tasks', (req, res) => {
    let paging = build_paging(req)
    paging = enrich_paging(paging)

    mgaccess.get_connection(common.database_uri, database_name, options).then(
        db => {
            const invoke_getlist = async() => {
                var result = await mgaccess.getlisttask(db, TASK_COLL, paging)
                return result
            }

            invoke_getlist().then(
                tasks => {
                    res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', tasks))
                },
                err => {
                    winston.error(err)
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                }
            )
        },
        err => {
            winston.error(err)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
        }
    )
})

// user task
router.get('/tasks/user/:id', (req, res) => {
    const id = req.params.id
    var validation = validator().validate(id).isNotEmpty().isMongoObjectId()

    const paging = build_paging(req)
    paging.filter = { 'client.id': id }

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_getlist = async() => {
                    var result = await mgaccess.getlist(db, TASK_COLL, paging)
                    return result
                }

                invoke_getlist().then(
                    tasks => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', tasks))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})

// task
router.get('/tasks/:id', (req, res) => {
    const id = req.params.id
    var validation = validator().validate(id).isNotEmpty().isMongoObjectId()

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_getone = async() => {
                    var result = await mgaccess.getonetask(db, TASK_COLL, { _id: id })
                    return result
                }

                invoke_getone().then(
                    tasks => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', tasks[0]))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})


// update
router.put('/tasks', (req, res) => {
    const task = req.body
    var validation = validator().validate(task.id).isNotNull().and.isNotEmpty().isMongoObjectId()

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        const id = task.id
        delete task['id']

        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_updateone = async() => {
                    var result = await mgaccess.updateone(db, TASK_COLL, id, task)
                    return result
                }

                invoke_updateone().then(
                    tasks => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', tasks))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})

// delete
router.delete('/tasks/:id', (req, res) => {
    const id = req.params.id
    var validation = validator().validate(id).isNotEmpty().isMongoObjectId()

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_updateone = async() => {
                    var result = await mgaccess.disable(db, TASK_COLL, id)
                    return result
                }

                invoke_updateone().then(
                    tasks => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', tasks))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})

// update 
router.put('/bids', (req, res) => {
    const bid = req.body
    var validation = validator().validate(bid.id).isNotNull().and.isNotEmpty().isMongoObjectId()

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        const id = bid.id
        delete bid['id']

        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_updateone = async() => {
                    var result = await mgaccess.updateone(db, BID_COLL, id, bid)
                    return result
                }

                invoke_updateone().then(
                    tasks => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', tasks))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})

// create 
router.post('/bids', (req, res) => {
    const bid = req.body
    const validation = validateBid(bid)

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        // enrich
        bid.created = new Date()
        bid.user = ObjectId(bid.user)
        bid.task = ObjectId(bid.task)

        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_updateone = async() => {
                    var result = await mgaccess.create(db, BID_COLL, bid)
                    return result
                }

                invoke_updateone().then(
                    task => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', task.ops[0]))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }

})

// create 
router.post('/tasks', (req, res) => {
    const task = req.body
    const validation = validateTask(task)

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        // enrich
        task.status = task_status.OPEN
        task.posted_date = new Date()

        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_updateone = async() => {
                    var result = await mgaccess.create(db, TASK_COLL, task)
                    return result
                }

                invoke_updateone().then(
                    task => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', task.ops[0]))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})

// task/search
router.get('/tasks/search/:searchstr', (req, res) => {
    const searchstr = req.params.searchstr

    const paging = build_paging(req)
    paging.filter = { title: { $regex: '.*' + searchstr + '.*' } }

    mgaccess.get_connection(common.database_uri, database_name, options).then(
        db => {
            const invoke_getlist = async() => {
                var result = await mgaccess.getlisttask(db, TASK_COLL, paging)
                return result
            }

            invoke_getlist().then(
                tasks => {
                    res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', tasks))
                },
                err => {
                    winston.error(err)
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                }
            )
        },
        err => {
            winston.error(err)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
        }
    )
})

router.get('/tasks/:id/search/:searchstr', (req, res) => {
    const searchstr = req.params.searchstr
    const id = req.params.id

    const paging = build_paging(req)
    paging.filter = { 'client.id': id, title: { $regex: '.*' + searchstr + '.*' } }

    var validation = validator().validate(id).isNotEmpty().isMongoObjectId()

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {

        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_getlist = async() => {
                    var result = await mgaccess.getlisttask(db, TASK_COLL, paging)
                    return result
                }

                invoke_getlist().then(
                    tasks => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', tasks))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})

// task/category
router.get('/tasks/category/:category', (req, res) => {
    let categories = req.params.category
    var validation = validator().validate(categories).isNotEmpty()

    categories = JSON.parse(categories)

    categories.forEach(category => {
        category = titleCase(category)
    })

    const paging = build_paging(req)
    paging.filter = { category: { $in: categories } }

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_getlist = async() => {
                    var result = await mgaccess.getlist(db, TASK_COLL, paging)
                    return result
                }

                invoke_getlist().then(
                    tasks => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', tasks))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})


const categories = ['Cleaning', 'Gardening', 'Handy Man', 'Furniture Assembly', 'Lawn Mowing', 'Snow Plowing', 'Childcare', 'Moving', 'Others']

// categories
router.get('/categories', (req, res) => {

    res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', categories))
})

const validateBid = (bid) => {
    const validation = validator()
        .validate(bid.user).isNotEmpty().and.isMongoObjectId()
        .validate(bid.task).isNotEmpty().and.isMongoObjectId()
        .validate(bid.amount).isNumber().isPositive()

    return validation
}

const validateTask = (task) => {
    const validation = validator()
        .validate(task.title).isNotEmpty()
        .validate(task.description).isNotEmpty()
        .validate(task.rate).isNotNull()
        .validate(task.rate.amount).isNumber().and.isPositive()
        .validate(task.location).isNotNull()
        .validate(task.location.street).isNotEmpty()
        .validate(task.location.city).isNotEmpty()
        .validate(task.location.state).isNotEmpty()
        .validate(task.location.zipcode).isNotEmpty()
        .validate(task.location.country).isNotEmpty()

    return validation
}

module.exports = router