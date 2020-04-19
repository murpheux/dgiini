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
import { MessageController } from '../../src/controllers/msg'

const _ = undefined

// Configure chai
chai.use(chaiHttp)
chai.use(sinonChai)

// prep actions
const expect = chai.expect
chai.should()

const mongoclient = mongodb.MongoClient
const DB_NAME = 'messages'

describe('msg api controller', () => {
    let req = undefined
    let res = undefined

    before(() => mongounit.start({ dbName: DB_NAME, port: 27019 }))

    beforeEach(() => {
        req = mockRequest(_, _, true, _)
        res = mockResponse()
    })

    it('test get message by id', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true,
        })

        const db = client.db(DB_NAME)
        const api = new MessageController(db)

        req.params.id = new mongodb.ObjectId().toHexString()
        await api.get_messages_by_id(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    it('test get message by invalid id', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true,
        })

        const db = client.db(DB_NAME)
        const api = new MessageController(db)

        req.params.id = ''
        await api.get_messages_by_id(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.BAD_REQUEST)
        await client.close()
    })

    it('test get message by missing id', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true,
        })

        const db = client.db(DB_NAME)
        const api = new MessageController(db)

        await api.get_messages_by_id(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.BAD_REQUEST)
        await client.close()
    })


    afterEach(() => mongounit.drop())

    after(() => mongounit.stop())

})