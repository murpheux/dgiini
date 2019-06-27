'use strict'

module.exports = (code, desc, payload) => {
    const json = {
        'code': code,
        'description': desc,
        'payload': payload
    }

    return json
}