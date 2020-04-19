/* eslint-disable no-unused-vars */
'use strict'

// Import the dependencies for testing
import chai from 'chai'
import chaiHttp from 'chai-http'
import sinon from 'sinon'
import nock from 'nock'
import sinonChai from 'sinon-chai'
import mongodb from 'mongodb'
import co from 'co'
import mongounit from 'mongo-unit'
import HttpStatus from 'http-status-codes'
import { not_found, authorize } from '../../src/shared/service.library'
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
const DB_NAME = 'test'


describe('api dependencies', () => {

    it('test authorize with user defined', async () => {
        const req = mockRequest(_, _, true, '')
        const res = mockResponse()

        await authorize(req, res, _)

        expect(res.status).to.have.been.calledWith(HttpStatus.FORBIDDEN)
        expect(res.send).to.have.been.calledWith({
            error: 'Forbidden!'
        })
    })

    it('test authorize without user defined', async () => {
        const req = mockRequest(_, _, true, _)
        const res = mockResponse()
        const next = sinon.spy()

        await authorize(req, res, next)

        expect(next).to.be.calledOnce
    })

    it('test not-found', async () => {
        const req = mockRequest(_, _, true)
        const res = mockResponse()

        await not_found(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.NOT_FOUND)
        expect(res.send).to.have.been.calledWith({
            error: 'API endpoint does not exist!'
        })
    })

    it('test not-found not accept json', async () => {
        const req = mockRequest(_, _, false)
        const res = mockResponse()

        await not_found(req, res)

        expect(res.status).to.have.been.calledWith(HttpStatus.NOT_FOUND)
        expect(res.type).to.have.been.calledWith('txt')
        expect(res.send).to.have.been.calledWith('API endpoint does not exist!')
    })

    afterEach(() => {
        nock.cleanAll()
    })

})