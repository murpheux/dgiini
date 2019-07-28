/* eslint-disable no-unused-vars */
'use strict'

import express from 'express'

import validator from 'fluent-validator'
import HttpStatus from 'http-status-codes'

import common from '../shared/common'
import { VALIDATION_MSG, NOTFOUND_MSG, PROVIDER_MSG } from '../shared/error_messages'
import { build_response, options, build_paging } from '../shared/lib'
import winston from '../shared/winston'
import got from 'got'

const mgaccess = require('../data/mongo_access')
const router = express.Router()
const database_name = process.env.AUTH_DATABASE || 'dg_authdb'
const find_city_service = process.env.CITY_SERVICE || 'https://tools.keycdn.com/geo.json'
const USER_COLL = 'users'
const CLIENT_COLL = 'clients'
const VENDOR_COLL = 'vendors'

const collections = [USER_COLL, CLIENT_COLL, VENDOR_COLL]
mgaccess.setup_database(common.database_uri, database_name, options, collections)
winston.info(`Collection ${collections} created!`)

// custom validators
validator.add('isCountry', 'Value is not a country', (country) => {
    return ['Canada', 'United States'].includes(country)
})

validator.add('isCity', 'Value is not a country', (city) => {
    return ['Calgary', 'Edmonton', 'Montreal', 'Winnipeg', 'Toronto', 'Regina', 'Sasktoon'].includes(city)
})

validator.add('isProvince', 'Value is not a country', (province) => {
    return ['AB', 'ON', 'QC', 'BC'].includes(province)
})

// login
router.post('/login', (req, res) => {
    const credential = req.body
    const validation = validateCredential(credential)

    const paging = {
        filter: { username: credential.username }
    }

    mgaccess.get_connection(common.database_uri, database_name, options).then(
        db => {
            const invoke_getone = async() => {
                var result = await mgaccess.getusers(db, USER_COLL, paging)
                return result
            }

            invoke_getone().then(
                user => {
                    if (user) {
                        user.lastLogin = new Date()
                        mgaccess.updateone(db, USER_COLL, user._id, { lastLogin: user.lastLogin }).then(
                            user_up => {
                                res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', user[0]))
                            },
                            err => {
                                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, 'Unable to update entity', user)), '', user))
                            }
                        )
                    } else {
                        res.status(HttpStatus.NOT_FOUND).json(build_response(HttpStatus.NOT_FOUND, 'User not registered', user))
                    }
                },
                err => {
                    winston.error(err)
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                }
            )
        },
        err => {
            winston.error(err)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
        }
    )
})

// register
router.post('/register', (req, res) => {
    let user = req.body
    user = updateNewUser(user)

    const validation = validateClient(user)

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_updateone = async() => {
                    var result = await mgaccess.create(db, USER_COLL, user)
                    return result
                }

                invoke_updateone().then(
                    user => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', user))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})

// promote
router.post('/promote', (req, res) => {
    let user = req.body
    user = updateNewUser(user)

    const validation = validateClient(user)

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_updateone = async() => {
                    var result = await mgaccess.create(db, USER_COLL, user)
                    return result
                }

                invoke_updateone().then(
                    user => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', user))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})

// user list
router.get('/users', (req, res) => {
    const paging = build_paging(req)

    mgaccess.get_connection(common.database_uri, database_name, options).then(
        db => {
            const invoke_getlist = async() => {
                var result = await mgaccess.getusers(db, USER_COLL, paging)
                return result
            }

            invoke_getlist().then(
                users => {
                    res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', users))
                },
                err => {
                    winston.error(err)
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                }
            )
        },
        err => {
            winston.error(err)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
        }
    )
})

// user
router.get('/users/:username', (req, res) => {
    const username = req.params.username
    var validation = validator().validate(username).isNotEmpty().isEmail()

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_getone = async() => {
                    var result = await mgaccess.getone(db, USER_COLL, { username: username })
                    return result
                }

                invoke_getone().then(
                    user => {
                        if (user) {
                            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', user))
                        } else {
                            res.status(HttpStatus.NOT_FOUND).json(build_response(HttpStatus.NOT_FOUND, NOTFOUND_MSG, username))
                        }
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})

router.get('/usersx/:username', (req, res) => {
    const username = req.params.username
    var validation = validator().validate(username).isNotEmpty().isEmail()

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_getone = async() => {
                    var result = await mgaccess.getusers(db, USER_COLL, { username: username })
                    return result
                }

                invoke_getone().then(
                    user => {
                        if (user) {
                            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', user[0]))
                        } else {
                            res.status(HttpStatus.NOT_FOUND).json(build_response(HttpStatus.NOT_FOUND, NOTFOUND_MSG, username))
                        }
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})


// update
router.put('/users', (req, res) => {
    const user = req.body
    var validation = validator().validate(user.id).isNotNull().and.isNotEmpty().isMongoObjectId()

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        const id = user.id
        delete user['id']

        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_updateone = async() => {
                    var result = await mgaccess.updateone(db, USER_COLL, id, user)
                    return result
                }

                invoke_updateone().then(
                    users => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', users))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})

// delete
router.delete('/users/:id', (req, res) => {
    const id = req.params.id
    var validation = validator().validate(id).isNotEmpty().isMongoObjectId()

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_updateone = async() => {
                    var result = await mgaccess.deleteOne(db, USER_COLL, id)
                    return result
                }

                invoke_updateone().then(
                    users => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', users))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})

const updateNewUser = (user) => {

    user.isActive = true
    user.isBanned = false
    user.lastLogin = null
    user.created = new Date()

    return user
}

// create client
router.post('/users/client', (req, res) => {
    const user = req.body
    const validation = validateClient(user)

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_updateone = async() => {
                    var result = await mgaccess.create(db, USER_COLL, user)
                    return result
                }

                invoke_updateone().then(
                    user => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', user))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})

// create vendor
router.post('/users/vendor', (req, res) => {
    const user = req.body
    const validation = validateClient(user)

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        mgaccess.get_connection(common.database_uri, database_name, options).then(
            db => {
                const invoke_updateone = async() => {
                    var result = await mgaccess.create(db, USER_COLL, user)
                    return result
                }

                invoke_updateone().then(
                    user => {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', user))
                    },
                    err => {
                        winston.error(err)
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
                    }
                )
            },
            err => {
                winston.error(err)
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err))
            }
        )
    }
})

// task/category
router.get('/findcity/:ip', (req, res) => {
    const ip = req.params.ip
    const validation = validator().validate(ip).isNotEmpty().isIP()
    const service_url = `${find_city_service}?host=${ip}`

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        (async() => {
            try {
                const response = await got(service_url, { json: true, headers: { accept: '*/*', connection: 'keep-alive' } })
                res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', response.body))
            } catch (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, PROVIDER_MSG, err))
            }
        })()

    }
})

const validateUser = (user) => {
    const validation = validator()
        .validate(user.username).isNotEmpty().and.isEmail()
        .validate(user.name).isNotNull()
        .validate(user.address.street).isNotNull()
        .validate(user.address.city).isNotNull().and.isCity()
        .validate(user.address.state).isNotNull().and.isProvince()
        .validate(user.address.zipcode).isNotNull().and.matches('^[A-Za-z][0-9][A-Za-z][ -]?[0-9][A-Za-z][0-9]')
        .validate(user.address.country).isNotNull().and.isCountry()

    return validation
}

const validateClient = (user) => {
    const validation = validateUser(user)
    validation
        .validate(user.username).isNotEmpty().and.isEmail()

    return validation
}

const validateVendor = (user) => {
    const validation = validateUser(user)
    validation
        .validate(user.username).isNotEmpty().and.isEmail()

    return validation
}

const validateCredential = (user) => {
    const validation = validator()
        .validate(user.username).isNotEmpty().and.isEmail()
        .validate(user.password).isNotEmpty()

    return validation
}

module.exports = router