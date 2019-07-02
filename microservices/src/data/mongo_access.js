import mongodb from 'mongodb'
const mongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectId

export const setup_database = (db_url, database_name, options, collections) => {
    mongoClient.connect(db_url, options, (err, client) => {
        collections.forEach(coll => {
            client.db(database_name).createCollection(coll, (err) => {
                if (err) throw err
            })
        })

        client.close()
    })
}

export const create_database = (db_url, database_name, options) => {
    return new Promise((resolve, reject) => {
        mongoClient.connect(db_url, options, (err, client) => {
            err ? reject(err) : resolve(client.db(database_name))
        })
    })
}

export const promise_getlist = (db, collection, paging) => {

    if (paging.filter['_id']) {
        paging.filter['_id'] = ObjectId(paging.filter['_id'])
    }

    return new Promise((resolve, reject) => {
        db.collection(collection).find()
            .skip(paging.page_limit * (paging.page - 1)).limit(paging.page_limit)
            .toArray((err, data) => {
                err ? reject(err) : resolve(data)
            })
    })
}

export const promise_getone = (db, collection, filter) => {
    return new Promise((resolve, reject) => {

        db.collection(collection).findOne(filter,
            (err, data) => {
                err ? reject(err) : resolve(data)
            })
    })
}