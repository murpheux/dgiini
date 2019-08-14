/* eslint-disable no-unused-vars */
'use strict'

import express from 'express'

import validator from 'fluent-validator'
import HttpStatus from 'http-status-codes'
import asyncHandler from 'express-async-handler'
import fetch from 'node-fetch'

import common from '../shared/common'
import { VALIDATION_MSG, NOTFOUND_MSG, PROVIDER_MSG } from '../shared/error_messages'
import { build_response, options, build_paging } from '../shared/lib'
import winston from '../shared/winston'

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
router.post('/login', asyncHandler(async(req, res, next) => {
    const credential = req.body
    const validation = validateCredential(credential)

    const paging = {
        filter: { username: credential.username }
    }

    const db = await mgaccess.get_connection(common.database_uri, database_name, options)
    const invoke_getone = async() => await mgaccess.getusers(db, USER_COLL, paging)

    const user = await invoke_getone()
    if (user) {
        user.lastLogin = new Date()
        const user_up = await mgaccess.updateone(db, USER_COLL, user._id, { lastLogin: user.lastLogin })
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', user[0]))
    } else {
        res.status(HttpStatus.NOT_FOUND).json(build_response(HttpStatus.NOT_FOUND, 'User not registered', user))
    }
}))

// register
router.post('/register', asyncHandler(async(req, res, next) => {
    let user = req.body
    user = updateNewUser(user)

    const validation = validateClient(user)

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_updateone = async() => await mgaccess.create(db, USER_COLL, user)

        const user = await invoke_updateone()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', user))
    }
}))

// promote
router.post('/promote', asyncHandler(async(req, res, next) => {
    let user = req.body
    user = updateNewUser(user)

    const validation = validateClient(user)

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_updateone = async() => await mgaccess.create(db, USER_COLL, user)

        const user = await invoke_updateone()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', user))
    }
}))

// user list
router.get('/users', asyncHandler(async(req, res, next) => {
    const paging = build_paging(req)

    const db = await mgaccess.get_connection(common.database_uri, database_name, options)
    const invoke_getlist = async() => await mgaccess.getusers(db, USER_COLL, paging)

    const users = await invoke_getlist()
    res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', users))
}))

// user
router.get('/users/:username', asyncHandler(async(req, res, next) => {
    const username = req.params.username
    var validation = validator().validate(username).isNotEmpty().isEmail()

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_getone = async() => await mgaccess.getone(db, USER_COLL, { username: username })

        const user = await invoke_getone()

        if (user) {
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', user))
        } else {
            res.status(HttpStatus.NOT_FOUND).json(build_response(HttpStatus.NOT_FOUND, NOTFOUND_MSG, username))
        }
    }
}))

router.get('/usersx/:username', asyncHandler(async(req, res, next) => {
    const username = req.params.username
    var validation = validator().validate(username).isNotEmpty().isEmail()

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_getone = async() => await mgaccess.getusers(db, USER_COLL, { username: username })

        const user = await invoke_getone()

        if (user) {
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', user[0]))
        } else {
            res.status(HttpStatus.NOT_FOUND).json(build_response(HttpStatus.NOT_FOUND, NOTFOUND_MSG, username))
        }
    }
}))


// update
router.put('/users', asyncHandler(async(req, res, next) => {
    const user = req.body
    var validation = validator().validate(user.id).isNotNull().and.isNotEmpty().isMongoObjectId()

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        const id = user.id
        delete user['id']

        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_updateone = async() => await mgaccess.updateone(db, USER_COLL, id, user)

        const users = await invoke_updateone()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', users))
    }
}))

// delete
router.delete('/users/:id', asyncHandler(async(req, res, next) => {
    const id = req.params.id
    var validation = validator().validate(id).isNotEmpty().isMongoObjectId()

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_updateone = async() => await mgaccess.deleteOne(db, USER_COLL, id)

        const users = await invoke_updateone()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', users))
    }
}))

const updateNewUser = (user) => {
    user.isActive = true
    user.isBanned = false
    user.lastLogin = null
    user.created = new Date()

    return user
}

// create client
router.post('/users/client', asyncHandler(async(req, res, next) => {
    const user = req.body
    const validation = validateClient(user)

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_updateone = async() => await mgaccess.create(db, USER_COLL, user)

        const user = await invoke_updateone()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', user))
    }
}))

// create vendor
router.post('/users/vendor', asyncHandler(async(req, res, next) => {
    const user = req.body
    const validation = validateClient(user)

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        const db = await mgaccess.get_connection(common.database_uri, database_name, options)
        const invoke_updateone = async() => await mgaccess.create(db, USER_COLL, user)

        const user = await invoke_updateone()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', user))
    }
}))

// task/category
router.get('/findcity/:ip', asyncHandler(async(req, res, next) => {
    const ip = req.params.ip
    const validation = validator().validate(ip).isNotEmpty().isIP()
    const service_url = `${find_city_service}?host=${ip}`

    if (validation.hasErrors()) {
        res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
    } else {
        (async() => {
            try {
                const response = await fetch(service_url) //, { json: true, headers: { accept: '*/*', connection: 'keep-alive' } })
                const json = await response.json()
                res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', json))
            } catch (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, PROVIDER_MSG, err))
            }
        })()

    }
}))

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