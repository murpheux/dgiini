/* eslint-disable no-unused-vars */
'use strict'

// Import the dependencies for testing
import chai from 'chai'
import sinon from 'sinon'
import mongodb from 'mongodb'
import co from 'co'
import mongounit from 'mongo-unit'
import { mockRequest, mockResponse } from './unit/shared.spec'

const _ = undefined
const expect = chai.expect
const DB_NAME = 'test'
const mongoclient = mongodb.MongoClient

describe('task mongo-unit', () => {
    
    const testData = {
        col1: [{ doc: 1 }, { doc: 2 }],
        col2: [{ rec: 1 }, { rec: 2 }],
    }

    before(() => mongounit.start({
        dbName: DB_NAME
    }))

    it('should safely start mongo several time', () => {
        return mongounit.start().then(url => {
            expect(url).to.equal(mongounit.getUrl())
        })
    })

    it('should connect to db and CRUD docs', () =>
        co(function* () {
            const client = yield mongoclient.connect(mongounit.getUrl(), {
                useUnifiedTopology: true,
            })
            const db = client.db(DB_NAME)
            const collection = db.collection('test')
            yield collection.insertOne({
                doc: 1
            })
            let results = yield collection.find().toArray()
            expect(results.length).to.equal(1)
            expect(results[0].doc).to.equal(1)
            yield collection.removeOne({
                doc: 1
            })
            results = yield collection.find().toArray()
            expect(results.length).to.equal(0)
            yield client.close()
        }))

    it('should load collection data', () =>
        co(function* () {
            yield mongounit.load(testData)
            const client = yield mongoclient.connect(mongounit.getUrl(), {
                useUnifiedTopology: true,
            })
            const db = client.db(DB_NAME)
            const collection1 = db.collection('col1')
            const collection2 = db.collection('col2')
            let results = yield collection1.find().toArray()
            expect(results.length).to.equal(2)
            expect(results[0].doc).to.equal(1)
            results = yield collection2.find().toArray()
            expect(results.length).to.equal(2)
            expect(results[1].rec).to.equal(2)
            yield client.close()
        }))

    it('should clean collection data', () =>
        co(function* () {
            yield mongounit.load(testData)
            yield mongounit.clean(testData)
            const client = yield mongoclient.connect(mongounit.getUrl(), {
                useUnifiedTopology: true,
            })
            const db = client.db(DB_NAME)
            const collection1 = db.collection('col1')
            const collection2 = db.collection('col2')
            let results = yield collection1.find().toArray()
            expect(results.length).to.equal(0)
            results = yield collection2.find().toArray()
            expect(results.length).to.equal(0)
            yield client.close()
        }))

    it('should init DB data for given URL', () =>
        co(function* () {
            const url = mongounit.getUrl()
            yield mongounit.initDb(url, testData)
            const client = yield mongoclient.connect(mongounit.getUrl(), {
                useUnifiedTopology: true,
            })
            const db = client.db(DB_NAME)
            const collection1 = db.collection('col1')
            const collection2 = db.collection('col2')
            let results = yield collection1.find().toArray()
            expect(results.length).to.equal(2)
            results = yield collection2.find().toArray()
            expect(results.length).to.equal(2)
            yield client.close()
        }))

    it('should dropDb DB data for given URL', () =>
        co(function* () {
            const url = mongounit.getUrl()
            yield mongounit.initDb(url, testData)
            yield mongounit.dropDb(url)
            const client = yield mongoclient.connect(mongounit.getUrl(), {
                useUnifiedTopology: true,
            })
            const db = client.db(DB_NAME)
            const collections = yield db.listCollections().toArray()
            expect(collections.length).to.equal(0)
            yield client.close()
        }))

    // it('should stop mongo and start again', () => {
    //     return mongounit
    //         .stop()
    //         .then(() => {
    //             expect(mongounit.getUrl).to.throw(Error)
    //             return mongounit.start()
    //         })
    //         .then(url => {
    //             expect('mongodb://localhost:27017/test').to.equal(mongounit.getUrl(), {
    //                 useUnifiedTopology: true,
    //             })
    //         })
    // })

    

    afterEach(() => mongounit.drop())

    after(() => mongounit.stop())
})