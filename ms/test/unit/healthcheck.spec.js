/* eslint-disable no-unused-vars */
'use strict'

// Import the dependencies for testing
import chai from 'chai'
import chaiHttp from 'chai-http'
import sinon from 'sinon'
import  nock from 'nock'
import sinonChai from 'sinon-chai'
import HttpStatus from 'http-status-codes'
import { mockRequest, mockResponse } from './shared.spec.js'
import { health_check } from '../../src/controllers/health'

const _ = undefined

// Configure chai
chai.use(chaiHttp)
chai.use(sinonChai)

// prep actions
const expect = chai.expect
chai.should()


describe('Healthcheck', async () => {
    before(async () => { })

    it('healthcheck', async () => {
        const req = mockRequest(_, _, true)
        const res = mockResponse()

        await health_check(req, res)
        
        expect(res.status).to.have.been.calledWith(HttpStatus.OK)
    })
    
    after(async () => { })
})