/* eslint-disable no-unused-vars */
'use strict'

// Import the dependencies for testing
import chai from 'chai'
import chaiHttp from 'chai-http'
import sinon from 'sinon'
import faker from 'faker'
import sinonChai from 'sinon-chai'
import mongodb from 'mongodb'
import mongounit from 'mongo-unit'
import HttpStatus from 'http-status-codes'
import { mockRequest, mockResponse } from './shared.spec'
import { NotifyController } from '../../src/controllers/notify'

const _ = undefined

// Configure chai
chai.use(chaiHttp)
chai.use(sinonChai)

// prep actions
const expect = chai.expect
chai.should()

const mongoclient = mongodb.MongoClient
const DB_NAME = 'notify'

describe('notify api controller', () => {
    const req = mockRequest(_, _, true, _)
    const res = mockResponse()

    before(() => mongounit.start({ dbName: DB_NAME, port: 27022 }))

    it('test send mail', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true
        })

        const db = client.db(DB_NAME)
        const api = new NotifyController(db)

        req.body = { subject: faker.lorem.word(), body: faker.lorem.sentence(), from: faker.internet.email(), to: faker.internet.email() }
        await api.send_mail(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    it('test send grid', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true,
        })

        const db = client.db(DB_NAME)
        const api = new NotifyController(db)

        req.body = { subject: faker.lorem.word(), body: faker.lorem.sentence(), from: faker.internet.email(), to: faker.internet.email() }
        await api.send_grid(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    afterEach(() => mongounit.drop())

    after(() => mongounit.stop())
})
