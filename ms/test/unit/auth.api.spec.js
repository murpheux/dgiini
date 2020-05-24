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
import { AuthenticationController } from '../../src/controllers/auth'

const _ = undefined

// Configure chai
chai.use(chaiHttp)
chai.use(sinonChai)

// prep actions
const expect = chai.expect
chai.should()

const mongoclient = mongodb.MongoClient
const DB_NAME = 'users'

describe('auth api controller', () => {
    const req = mockRequest(_, _, true, _)
    const res = mockResponse()

    before(() => mongounit.start({ dbName: DB_NAME, port: 27020 }))

    it('test login', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true
        })

        const db = client.db(DB_NAME)
        const api = new AuthenticationController(db)

        req.body = { username: faker.internet.email(), password: faker.internet.password() }
        await api.login(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    it('test register', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true,
        })

        const db = client.db(DB_NAME)
        const api = new AuthenticationController(db)

        req.body = { username: faker.internet.email(), name: faker.name.findName(), 
            address: { street: faker.address.streetAddress(), city: faker.address.city(),
                state: faker.address.state(), zipcode: faker.address.zipCode(), country: faker.address.country() } }
        await api.register(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    it('test promote to tasker', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true,
        })

        const db = client.db(DB_NAME)
        const api = new AuthenticationController(db)

        req.body = { username: faker.internet.email(), name: faker.name.findName(), 
            address: { street: faker.address.streetAddress(), city: faker.address.city(),
                state: faker.address.state(), zipcode: faker.address.zipCode(), country: faker.address.country() } }
        await api.promote(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    it('test get user list', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true,
        })

        const db = client.db(DB_NAME)
        const api = new AuthenticationController(db)

        await api.user_list(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    it('test get user stats', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true,
        })

        const db = client.db(DB_NAME)
        const api = new AuthenticationController(db)

        await api.user_stats(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    it('test get user by role', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true,
        })

        const db = client.db(DB_NAME)
        const api = new AuthenticationController(db)

        await api.user_by_role(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    it('test get tasker by skill', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true,
        })

        const db = client.db(DB_NAME)
        const api = new AuthenticationController(db)

        await api.tasker_by_skill(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    it('test get user', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true,
        })

        const db = client.db(DB_NAME)
        const api = new AuthenticationController(db)

        await api.get_user(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    it('test get user ex', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true,
        })

        const db = client.db(DB_NAME)
        const api = new AuthenticationController(db)

        await api.get_user_ex(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    it('test update user', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true,
        })

        const db = client.db(DB_NAME)
        const api = new AuthenticationController(db)

        await api.update_user(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    it('test delete user', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true,
        })

        const db = client.db(DB_NAME)
        const api = new AuthenticationController(db)

        await api.delete_user(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    it('test create user', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true,
        })

        const db = client.db(DB_NAME)
        const api = new AuthenticationController(db)

        req.body = { username: faker.internet.email(), name: faker.name.findName(), 
            address: { street: faker.address.streetAddress(), city: faker.address.city(),
                state: faker.address.state(), zipcode: faker.address.zipCode(), country: faker.address.country() } }
        await api.create_user(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    it('test find city', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true,
        })

        const db = client.db(DB_NAME)
        const api = new AuthenticationController(db)

        req.params.ip = '0.0.0.0'
        await api.find_city_by_ip(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    it('test find city wrong ip', async () => {
        const client = await mongoclient.connect(mongounit.getUrl(), {
            useUnifiedTopology: true,
        })

        const db = client.db(DB_NAME)
        const api = new AuthenticationController(db)

        req.params.ip = 'yada'
        await api.find_city_by_ip(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
        await client.close()
    })

    afterEach(() => mongounit.drop())

    after(() => mongounit.stop())
})
