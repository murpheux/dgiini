/* eslint-disable no-unused-vars */
import chai from 'chai'
import chaiHttp from 'chai-http'
import sinonChai from 'sinon-chai'
import HttpStatus from 'http-status-codes'
import chaiSchema from 'chai-json-schema'

chai.use(chaiHttp)
chai.use(sinonChai)
chai.use(chaiSchema)

const request = chai.request('http://localhost:8006')

describe('notify API', () => {

    it('test ping', async () => {
        const res = await request.get('/api/notify/v1')
        const schema = {'Service': {type: 'string'}}
        
        res.should.have.status(HttpStatus.OK)
        res.should.be.json
        res.body.should.be.jsonSchema(schema)
    })
})