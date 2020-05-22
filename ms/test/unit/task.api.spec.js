/* eslint-disable no-unused-vars */
'use strict'

// Import the dependencies for testing
import chai from 'chai'
import chaiHttp from 'chai-http'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import mongodb from 'mongodb'
import mongounit from 'mongo-unit'
import HttpStatus from 'http-status-codes'
import { mockRequest, mockResponse } from './shared.spec'
import { TaskController } from '../../src/controllers/task'

const _ = undefined

// Configure chai
chai.use(chaiHttp)
chai.use(sinonChai)

// prep actions
const expect = chai.expect
chai.should()

const mongoclient = mongodb.MongoClient
const DB_NAME = 'tasks'

describe('task api controller', () => {
    const req = mockRequest(_, _, true, _)
    const res = mockResponse()

    before(() => mongounit.start({ dbName: DB_NAME, port: 27018 }))

    it('test get tasks', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true
        })

        const db = client.db(DB_NAME)
        const api = new TaskController(db)

        await api.get_tasks(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    it('test get tasks by city', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true,
        })

        const db = client.db(DB_NAME)
        const api = new TaskController(db)

        // set params
        req.params.city = 'Calgary'
        await api.get_tasks_by_city(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    afterEach(() => mongounit.drop())

    after(() => mongounit.stop())
})
