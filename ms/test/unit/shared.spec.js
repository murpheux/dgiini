'use strict'

import sinon from 'sinon'

export const mockResponse = () => {
    const res = {}
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)
    res.type = sinon.stub().returns(res)
    res.send = sinon.stub().returns(res)
    return res
}

export const mockRequest = (authHeader, sessionData, accepts, user) => ({
    get(name) {
        if (name === 'authorization') return authHeader
        return null
    },
    session: { data: sessionData },
    accepts: sinon.stub().returns(accepts),
    query: sinon.stub().returns({dir: {}, sort_keys: []}),
    params: { id: null, city: null },
    user: user,
    body: {},
    cardno: ''
})
