/* eslint-disable no-unused-vars */
import mongodb from 'mongodb'

const mongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectId

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
    getlist: (db, collection, paging) => {

        if (paging.filter['_id']) {
            paging.filter['_id'] = ObjectId(paging.filter['_id'])
        }

        if (paging.lastid) {
            return new Promise((resolve, reject) => {
                db.collection(collection).find({ '_id': { '$gt': ObjectId(paging.lastid) } })
                    .limit(paging.page_limit)
                    .toArray((err, data) => {
                        err ? reject(err) : resolve(data)
                    })
            })
        } else {
            return new Promise((resolve, reject) => {
                db.collection(collection).find(paging.filter)
                    .skip(paging.page_limit * (paging.page - 1)).limit(paging.page_limit)
                    .toArray((err, data) => {
                        err ? reject(err) : resolve(data)
                    })
            })
        }
    },

    // get one
    getone: (db, collection, filter) => {
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
    updateone: (db, collection, id, item) => {
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
    }

}