/* eslint-disable no-unused-vars */
import chai from 'chai'
import sinon from 'sinon'
import chaiHttp from 'chai-http'
import sinonChai from 'sinon-chai'
import HttpStatus from 'http-status-codes'

chai.use(chaiHttp)
chai.use(sinonChai)

const request = chai.request('http://localhost:8002')
const assert = chai.assert
const expect = chai.expect
const should = chai.should()

describe('Healthcheck', async () => {
    before(async () => { })

    it('returns 200 if server is healthy', async () => {
        const res = await request.get('/healthcheck')
        
        expect(res).to.have.status(HttpStatus.OK)
        expect(res.body.uptime).to.be.above(0)
    })

    after(async () => { })
})