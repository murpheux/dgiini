'use strict'

const construct_output = (res, code, desc, payload) => {
    const json = {
        'code': code,
        'description': desc,
        'payload': payload
    }

    res.json(json)
}

export default construct_output