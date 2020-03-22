/* eslint-disable no-unused-vars */
'use strict'

// Import the dependencies for testing
import chai from 'chai'
import chaiHttp from 'chai-http'
import sinon from 'sinon'
import  nock from 'nock'
import sinonChai from 'sinon-chai'
import HttpStatus from 'http-status-codes'

// import api from '../src/routes/task.routes'

// Configure chai
chai.use(chaiHttp)
chai.use(sinonChai)

// prep actions
const assert = chai.assert
const expect = chai.expect
const should = chai.should()

// describe('ATask', () => {
//     describe('GET /tasks', () => {
//         // Test to get all students record
//         it('should do something', (done) => {
//             const mg = sinon.fake.returns(42)
//             const m = new TaskRoute(mg)

//             const resp = m.doSomething()

//             assert(mg.called)
//             expect(resp).to.equal(42)
//             should.equal(resp, 42)

//             done()
//         })
//     })
// })

describe('testing the task API', () => {
    let server, taskStub

    it('test ping', async (done) => {
        const callback = sinon.stub()//(server, 'isAuthenticated')
        // .callsFake((req, res, next) => { return next() })

        callback.withArgs(42).returns(1)
        callback.withArgs(1).throws('name')

        callback()
        callback(42)
        done()
    })

    afterEach(() => {
        nock.cleanAll()
    })
    
})


// describe('Tasks', () => {
//     describe('GET /tasks', () => {
//         // Test to get all students record
//         it('should get all task record', (done) => {
//             chai.request(api)
//                 .get('/tasks')
//                 .end((err, res) => {
//                     res.should.have.status(HttpStatus.OK)
//                     res.body.should.be.a('object')
//                     done()
//                 })
//         })

//         // Test to get single student record
//         it('should get a single task record', (done) => {
//             const id = 1
//             chai.request(api)
//                 .get(`/${id}`)
//                 .end((err, res) => {
//                     res.should.have.status(HttpStatus.OK)
//                     res.body.should.be.a('object')
//                     done()
//                 })
//         })

//         // Test to get single student record
//         it('should not get a single task record', (done) => {
//             const id = 5
//             chai.request(api)
//                 .get(`/${id}`)
//                 .end((err, res) => {
//                     res.should.have.status(HttpStatus.NOT_FOUND)
//                     done()
//                 })
//         })
//     })
// })