'use strict'

export const options = {
    poolSize: 20,
    socketTimeoutMS: 480000,
    keepAlive: 300000,
    sslValidate: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true
}

export const build_response = (code, desc, payload) => {
    const json = {
        'code': code,
        'description': desc,
        'payload': payload
    }

    return json
}

export const build_paging = req => {
    return {
        order_dir: req.query.dir,
        sort_keys: req.query.sort_keys,
        filter: JSON.parse(req.query.filter || '{}'),
        page: parseInt(req.query.page) || 0,
        page_limit: parseInt(req.query.pagelimit) || 0,
        lastid: req.query.lastid
    }
}