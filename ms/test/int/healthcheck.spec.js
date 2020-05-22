/* eslint-disable no-unused-vars */
import chai from 'chai'
import sinon from 'sinon'
import chaiHttp from 'chai-http'
import sinonChai from 'sinon-chai'
import chaiSchema from 'chai-json-schema'
import HttpStatus from 'http-status-codes'

chai.use(chaiHttp)
chai.use(sinonChai)
chai.use(chaiSchema)

const ports = [8000, 8002, 8004, 8006, 8008]
const expect = chai.expect
chai.should()

const hzSchema = {'$schema':'http://json-schema.org/draft-04/schema#','type':'object','properties':{'uptime':{'type':'number'},'message':{'type':'string'},'timestamp':{'type':'integer'}},'required':['uptime','message','timestamp']}

describe('Healthcheck', async () => {
    before(async () => { })

    ports.forEach(port => {
        it(`healthcheck - ${port}`, async () => {
            const res = await chai.request(`http://localhost:${port}`)
                .get('/healthcheck')
            
            res.should.have.status(HttpStatus.OK)
            res.body.uptime.should.be.above(0)
            res.body.should.be.jsonSchema(hzSchema)
        })
    })
    
    after(async () => { })
})