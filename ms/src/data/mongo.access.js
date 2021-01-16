/* eslint-disable no-unused-vars */
'use strict'

import mongodb from 'mongodb'
import winston from '../shared/winston'

const mongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectId

const task_select_plain = {title: 1, description: 1, category: 1, location: 1, rate: 1, client: 1, scheduled_date: 1, estimated_hours: 1, status: 1, created: 1, role: 1, posted_date: 1, cancelled_date: 1}

const task_select = {
    title: 1,
    description: 1,
    location: 1,
    rate: 1,
    client: 1,
    created: 1,
    category: 1,
    role: 1,
    estimated_hours: 1,
    status: 1,
    bidcount: { $size: '$bids' },
    scheduled_date: 1,
    acceptedbid: { $filter : {
        input: '$bids',
        as : 'accbids',
        cond : {
            $eq: ['$$accbids.accepted', true]
        }
    } },
    lastbid: { $arrayElemAt: ['$bids', -1] }
}

const user_select = {
    name: 1,
    username: 1,
    email: 1,
    address: 1,
    isActive: 1,
    isBanned: 1,
    lastLogin: { $arrayElemAt: ['$logins.date', -1] },
    created: 1,
    role: 1,
    rating: { $avg: '$ratings.rating' },
    ratingcount: { $size: '$ratings' },
    picture: 1
}

const process_paging = (paging) => {

    if (paging.filter['_id']) {
        if (Array.isArray(paging.filter['_id'])) {
            paging.filter['_id'] = { $in: paging.filter['_id'].map(m => ObjectId(m)) }
        } else {
            paging.filter['_id'] = ObjectId(paging.filter['_id'])
        }
    }

    return paging
}

module.exports = {

    // init
    setup_database: (db_url, database_name, options, collections) => {
        return new Promise((resolve, reject) => {
            mongoClient.connect(db_url, options, (err, client) => {
                collections.forEach(coll => {
                    client.db(database_name).createCollection(coll, (err) => {
                        err ? reject(err) : resolve(coll)
    
                        if (coll === collections[collections.length - 1]) { client.close() }
                    })
                })
            })
        })
    },


    // get connection
    get_connection: (db_url, database_name, options) => {
        return new Promise((resolve, reject) => {
            mongoClient.connect(db_url, options, (err, client) => {
                err ? reject(err) : resolve(client.db(database_name))
            })
        })
    },

    // create
    create: (db, collection, item) => {
        return new Promise((resolve, reject) => {
            db.collection(collection).insertOne(item,
                (err, data) => {
                    err ? reject(err) : resolve(data)
                })
        })
    },

    // get list
    get_list: (db, collection, paging) => {

        if (paging.filter['_id']) {

            if (Array.isArray(paging.filter['_id'])) {
                paging.filter['_id'] = { $in: paging.filter['_id'].map(m => ObjectId(m)) }
            } else {
                paging.filter['_id'] = ObjectId(paging.filter['_id'])
            }
        }

        if (paging.lastid) {
            const count = new Promise((resolve, reject) => {
                const count = db.collection(collection).find({ '_id': { '$gt': ObjectId(paging.lastid) } })
                    .count()

                resolve(count)
            })

            const data = new Promise((resolve, reject) => {
                const data = db.collection(collection).find({ '_id': { '$gt': ObjectId(paging.lastid) } })
                    .limit(paging.page_limit)
                    .toArray()

                resolve(data)
            })

            return Promise.all([count, data])
        } else {
            const count = new Promise((resolve, reject) => {
                const count = db.collection(collection).find(paging.filter)
                    .count()

                resolve(count)
            })

            const data = new Promise((resolve, reject) => {
                const data = db.collection(collection).find(paging.filter) //.sort(paging.sort_keys)
                    .skip(paging.page_limit * (paging.page - 1)).limit(paging.page_limit)
                    .toArray()

                resolve(data)
            })

            return Promise.all([count, data])
        }
    },

    // get one
    get_one: (db, collection, filter) => {
        if (filter['_id']) {
            filter['_id'] = ObjectId(filter['_id'])
        }

        return new Promise((resolve, reject) => {
            db.collection(collection).findOne(filter,
                (err, data) => {
                    err ? reject(err) : resolve(data)
                })
        })
    },

    // update
    update_one: (db, collection, id, item) => {
        return new Promise((resolve, reject) => {
            db.collection(collection).updateOne({
                _id: ObjectId(id)
            }, {
                $set: item
            }, (err, data) => {
                err ? reject(err) : resolve(data)
            })
        })
    },

    // disable
    //TODO: change to disable
    disable: (db, collection, id) => {
        return new Promise((resolve, reject) => {
            db.collection(collection).deleteOne({
                _id: ObjectId(id)
            }, (err, data) => {
                err ? reject(err) : resolve(data)
            })
        })
    },

    // delete
    destroy: (db, collection, id) => {
        return new Promise((resolve, reject) => {
            db.collection(collection).deleteOne({
                _id: ObjectId(id)
            }, (err, data) => {
                err ? reject(err) : resolve(data)
            })
        })
    },

    // item count
    count: (db, collection, filter) => {
        return new Promise((resolve, _) => {
            const count = db.collection(collection).find(filter).count()
            resolve(count)
        })
    },

    // get user by role
    get_users_by_role: (db, collection, paging, role) => {
        process_paging(paging)

        return new Promise((resolve, _) => {
            const doc = db.collection(collection).aggregate([
                { $match: { roles: { $elemMatch: { $eq: role } } } }
            ]).toArray()

            resolve(doc)
        })
    },

    get_vendors_by_skill: (db, collection, paging, skill) => {
        process_paging(paging)

        return new Promise((resolve, _) => {
            const doc = db.collection(collection).aggregate([
                { $match: { skills: { $elemMatch: { $eq: skill } } } },
                { $lookup: { from: 'ratings', localField: '_id', foreignField: 'user', as: 'ratings' } },
                { $lookup: { from: 'logins', localField: 'username', foreignField: 'email', as: 'logins' } },
                {
                    $project: {
                        name: 1,
                        email: -1,
                        username: 1,
                        address: 1,
                        isActive: 1,
                        isBanned: 1,
                        lastLogin: { $arrayElemAt: ['$logins.date', -1] },
                        created: 1,
                        roles: -1,
                        dob: -1,
                        rating: { $avg: '$ratings.rating' },
                        ratingcount: { $size: '$ratings' },
                        picture: 1,
                        skill_summary: -1,
                        work_cities: -1,
                        skills: -1,
                        qualificiations: -1,
                        vehicles: -1,
                        how_heard: -1
                    }
                }
            ]).toArray()

            resolve(doc)
        })
    },

    // get users
    get_users: (db, collection, paging) => {
        process_paging(paging)

        return new Promise((resolve, _) => {
            const doc = db.collection(collection).aggregate([
                { $match: paging.filter },
                { $lookup: { from: 'ratings', localField: '_id', foreignField: 'user', as: 'ratings' } },
                { $lookup: { from: 'logins', localField: 'username', foreignField: 'email', as: 'logins' } },
                { $project: user_select }
            ]).toArray()

            resolve(doc)
        })

    },

    get_one_task: (db, collection, filter) => {
        if (filter['_id']) { filter['_id'] = ObjectId(filter['_id']) }

        return new Promise((resolve, _) => {
            const doc = db.collection(collection).aggregate([
                { $match: filter },
                { $lookup: { from: 'bids', localField: '_id', foreignField: 'task', as: 'bids' } },
                { $project: task_select }
            ]).toArray()

            resolve(doc)
        })

    },

    get_tasks_photos: (db, collection, paging) => {
        process_paging(paging)

        return new Promise((resolve, _) => {
            const doc = db.collection(collection).aggregate([
                { $match: paging.filter },
                {
                    $project: {
                        photos: 1
                    }
                }
            ]).toArray()

            resolve(doc)
        })

    },

    get_task_statistics: (db, collection, filter) => {

        return new Promise((resolve, _) => {
            const doc = db.collection(collection).aggregate([{
                $facet: {
                    'totalTask': [
                        { $match: {} },
                        { $count: 'totalTask' },
                    ],
                    'openedTask': [
                        { $match: { status: { $eq: 'open' } } },
                        { $count: 'openedTask' }
                    ],
                    'filledTask': [
                        { $match: { status: { $eq: 'completed' } } },
                        { $count: 'filledTask' }
                    ]
                }
            },
            {
                $project: {
                    'total': { $arrayElemAt: ['$totalTask.totalTask', 0] },
                    'opened': { $arrayElemAt: ['$openedTask.openedTask', 0] },
                    'filled': { $arrayElemAt: ['$filledTask.filledTask', 0] }
                }
            }
            ]).toArray()

            resolve(doc)
        })

    },

    get_user_statistics: (db, collection, filter) => {

        return new Promise((resolve, _) => {
            const doc = db.collection(collection)
                .aggregate([{
                    $facet: {
                        'client': [{ $match: {} }, { $count: 'client' }, ],
                        'vendor': [{ $match: { role: { $elemMatch: { $eq: 'vendor' } } }}, { $count: 'vendor' }]
                    }
                },
                {
                    $project: {
                        'client': { $arrayElemAt: ['$client.client', 0] },
                        'vendor': { $arrayElemAt: ['$vendor.vendor', 0] }
                    }
                }
                ]).toArray()

            resolve(doc)
        })

    },

    get_category_statistics: (db, collection, filter) => {

        return new Promise((resolve, _) => {
            const doc = db.collection(collection)
                .aggregate([
                    {$match: {'status': {'$eq': 'open'}}},
                    {'$group' : {_id:'$category', count:{$sum:1}}}
                ]).toArray()

            resolve(doc)
        })
    },

    get_user_status_statistics: (db, collection, id) => {

        return new Promise((resolve, _) => {
            const doc = db.collection(collection)
                .aggregate([
                    {$match: {'client': {'$eq': id}}},
                    {'$group' : {_id:'$status', count:{$sum:1}}}
                ]).toArray()

            resolve(doc)
        })
    },

    get_category_statistics_by_city: (db, collection, paging) => {

        return new Promise((resolve, _) => {
            const doc = db.collection(collection)
                .aggregate([
                    {'$match' : paging.filter },
                    {'$group' : {_id:'$category', count:{$sum:1}}}
                ]).toArray()

            resolve(doc)
        })
    },

    search_task: (db, collection, paging) => {

        return new Promise((resolve, reject) => {
            db.collection(collection).find(paging.filter)
                .toArray((err, data) => {
                    err ? reject(err) : resolve(data)
                })
        })

    },

    get_list_task: (db, collection, paging) => {

        paging = process_paging(paging)

        if (paging.lastid) {
            const count = new Promise((resolve, reject) => {
                const count = db.collection(collection)
                    .aggregate([{ $match: { '_id': { '$gt': ObjectId(paging.lastid) } } },
                        { $count: 'count' }
                    ])
                    .toArray()

                resolve(count)
            })

            const data = new Promise((resolve, reject) => {
                const data = db.collection(collection)
                    .aggregate([{ $match: { '_id': { '$gt': ObjectId(paging.lastid) } } },
                        { $lookup: { from: 'bids', localField: '_id', foreignField: 'task', as: 'bids' } },
                        {
                            $project: task_select
                        }
                    ]).limit(paging.page_limit)
                    .toArray()

                resolve(data)
            })

            return Promise.all([count, data])
        } else {
            const count = new Promise((resolve, reject) => {

                const count = db.collection(collection)
                    .aggregate([{ $match: paging.filter },
                        { $count: 'count' }
                    ]).toArray()

                resolve(count)
            })

            const data = new Promise((resolve, reject) => {
                const data = db.collection(collection)
                    .aggregate([{ $match: paging.filter },
                        { $project: {'sid': {$toString: '$_id'}, title: 1, description: 1, category: 1, location: 1, rate: 1, client: 1, scheduled_date: 1, estimated_hours: 1, status: 1, created: 1, role: 1, posted_date: 1, cancelled_date: 1 }},
                        { $lookup: { from: 'bids', localField: 'sid', foreignField: 'task', as: 'bids' } },
                        { $project: task_select },
                        { $skip: paging.page_limit * (paging.page - 1) },
                        { $limit: paging.page_limit },
                        { $sort: { '_id': 1 } }
                    ]).toArray()

                resolve(data)
            })

            return Promise.all([count, data])
        }

    },

}