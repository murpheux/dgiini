'use strict'

const construct_output = (res, code, desc, payload) => {
    const json = {
        'code': code,
        'description': desc,
        'payload': payload
    }

    res.json(json)
}

exports = construct_output