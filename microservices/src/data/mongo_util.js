/* eslint-disable no-console */
const mongoClient = require('mongodb').MongoClient
const common = require('../shared/common')

const database = process.env.TASK_DATABASE || 'dg_taskdb'
const TASK_COLL = 'tasks'

let _db = undefined
const options = {
    poolSize: 20,
    socketTimeoutMS: 480000,
    keepAlive: 300000,
    sslValidate: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true
}

module.exports = {

    // setup database and tables
    connectToServer: (callback) => {
        mongoClient.connect(common.database_uri, options,
            (err, client) => {
                _db = client.db(database)

                _db.createCollection(TASK_COLL, (err, _) => {
                    if (err) throw err

                    console.log(`Collection ${TASK_COLL} created!`)
                    client.close()
                })

                return callback(err)
            })
    },

    getDbContext: () => {
        return _db
    }
}