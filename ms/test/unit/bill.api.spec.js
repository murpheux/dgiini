/* eslint-disable no-unused-vars */
'use strict'

// Import the dependencies for testing
import chai from 'chai'
import chaiHttp from 'chai-http'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import mongodb from 'mongodb'
import faker from 'faker'
import mongounit from 'mongo-unit'
import HttpStatus from 'http-status-codes'
import { mockRequest, mockResponse } from './shared.spec'
import { BillController } from '../../src/controllers/bill'

const _ = undefined

// Configure chai
chai.use(chaiHttp)
chai.use(sinonChai)

// prep actions
const expect = chai.expect
chai.should()

const mongoclient = mongodb.MongoClient
const DB_NAME = 'bills'

describe('bill api controller', () => {
    const req = mockRequest(_, _, true, _)
    const res = mockResponse()

    before(() => mongounit.start({ dbName: DB_NAME, port: 27021 }))

    it('test add card', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true
        })

        const db = client.db(DB_NAME)
        const api = new BillController(db)

        req.body = { cardno: faker.finance.iban() }
        await api.add_card(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    it('test get card', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true,
        })

        const db = client.db(DB_NAME)
        const api = new BillController(db)

        await api.get_card(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    it('test bill card', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true,
        })

        const db = client.db(DB_NAME)
        const api = new BillController(db)

        await api.bill_card(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    afterEach(() => mongounit.drop())

    after(() => mongounit.stop())
})
