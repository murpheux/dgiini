/* eslint-disable no-unused-vars */
import chai from 'chai'
import chaiHttp from 'chai-http'
import sinonChai from 'sinon-chai'
import chaiSchema from 'chai-json-schema'
import HttpStatus from 'http-status-codes'

chai.use(chaiHttp)
chai.use(sinonChai)
chai.use(chaiSchema)

const request = chai.request('http://localhost:8002')
chai.should()

const resSchema = {'$schema':'http://json-schema.org/draft-04/schema#','type':'object','properties':{'code':{'type':'integer'},'description':{'type':'string'},'payload':{'type':'object','properties':{'count':{'type':'integer'},'data':{}},'required':['count']}},'required':['code','description','payload']}


describe('task API', () => {

    it('test ping', async () => {
        const res = await request.get('/api/task/v1')
        const schema = {'Service': {type: 'string'}}
        
        res.should.have.status(HttpStatus.OK)
        res.should.be.json
        res.body.should.be.jsonSchema(schema)
    })

    it('test not-found', async () => {
        const res = await request.get('/api/task/v1/abba')
        
        res.should.have.status(HttpStatus.NOT_FOUND)
        res.should.be.json
        res.body.should.deep.equal({ error: 'API endpoint does not exist!' })
    })

    it('test not-found plain', async () => {
        const res = await request.get('/api/task/v1/abba')
            .set('Accept', 'text/plain')
        
        res.should.have.status(HttpStatus.NOT_FOUND)
        res.text.should.equal('API endpoint does not exist!')
    })

    it('test get categories', async () => {
        const res = await request.get('/api/task/v1/categories')
        
        res.should.have.status(HttpStatus.OK)
        res.should.be.json
        res.body.should.be.jsonSchema(resSchema)
    })

    it('test get tasks', async () => {
        const res = await request.get('/api/task/v1/tasks')
        
        res.should.have.status(HttpStatus.OK)
        res.should.be.json
        res.body.should.be.jsonSchema(resSchema)
    })

    it('test get tasksbycity', async () => {
        const res = await request.get('/api/task/v1/tasks/city/Calgary')
        
        res.should.have.status(HttpStatus.OK)
        res.should.be.json
        res.body.should.be.jsonSchema(resSchema)
    })

    it('test get tasksbyid not found', async () => {
        const res = await request.get('/api/task/v1/tasks/5dbefb98745afd64828fa91a')
        
        res.should.have.status(HttpStatus.OK)
        res.should.be.json
        res.body.should.be.jsonSchema(resSchema)
    })

    it('test get tasksbyid invalid id', async () => {
        const res = await request.get('/api/task/v1/tasks/abba')
        
        res.should.have.status(HttpStatus.BAD_REQUEST)
        res.should.be.json
    })

    it('test get stats full', async () => {
        const res = await request.get('/api/task/v1/tasks/stats/full')
        
        res.should.have.status(HttpStatus.OK)
        res.should.be.json
        res.body.should.be.jsonSchema(resSchema)
    })

})