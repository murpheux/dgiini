/* eslint-disable no-unused-vars */
'use strict'

import fetch from 'node-fetch'
import common from '../shared/common'
import validator from 'fluent-validator'
import HttpStatus from 'http-status-codes'
import NodeCache from 'node-cache'
import { validateClient, validateCredential, validateVendor } from '../shared/validator'

import mgaccess from '../data/mongo.access'
import { VALIDATION_MSG, NOTFOUND_MSG, PROVIDER_MSG } from '../shared/error_messages'
import { build_response, options, build_paging } from '../shared/service.library'

const find_city_service = process.env.CITY_SERVICE || 'https://tools.keycdn.com/geo.json'

export class AuthenticationController {
    USER_COLL = 'users'

    constructor(dbContext) {
        this.db = dbContext
        this.cache = new NodeCache()
    }

    login = async(req, res) => {
        const credential = req.body
        const validation = validateCredential(credential)
    
        const paging = {
            filter: { username: credential.username }
        }
    
        const invoke_getone = async() => await mgaccess.get_users(this.db, this.USER_COLL, paging)
    
        const user = await invoke_getone()
        if (user) {
            user.lastLogin = new Date()
            // const user_up = await mgaccess.update_one(this.db, this.USER_COLL, user._id, { lastLogin: user.lastLogin })
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', user[0]))
        } else {
            res.status(HttpStatus.NOT_FOUND).json(build_response(HttpStatus.NOT_FOUND, 'User not registered', user))
        }
    }

    register = async(req, res) => {
        const user = req.body
        const validation = validateClient(user)
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            // enrich
            user.isActive = true
            user.isBanned = false
            
            const dt = new Date()
            user.lastLogin = dt
            user.created = dt
    
            const invoke_updateone = async() => await mgaccess.create(this.db, this.USER_COLL, user)
    
            const result = await invoke_updateone()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', result))
        }
    }

    promote = async(req, res) => {
        let user = req.body
        const validation = validateVendor(user)
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            const id = user._id
            user.becomeVendor = new Date()
            delete user['_id']

            const invoke_updateone = async() => await mgaccess.update_one(this.db, this.USER_COLL, id, user)
    
            const result = await invoke_updateone()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, result))
        }
    }

    user_list = async(req, res) => {
        const paging = build_paging(req)
    
        const invoke_getlist = async() => await mgaccess.get_users(this.db, this.USER_COLL, paging)
    
        const users = await invoke_getlist()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, users))
    }

    user_stats = async(_req, res) => {
        const invoke_getstats = async() => await mgaccess.get_user_statistics(this.db, this.USER_COLL, undefined)
    
        const stats = await invoke_getstats()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, stats[0]))
    }

    user_by_role = async(req, res) => {
        const role = req.params.role
        const paging = build_paging(req)
    
        const invoke_getlist = async() => await mgaccess.get_users_by_role(this.db, this.USER_COLL, paging, role)
    
        const users = await invoke_getlist()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, users))
    }

    tasker_by_skill = async(req, res) => {
        const skill = req.params.skill
        const paging = build_paging(req)
    
        const invoke_getlist = async() => await mgaccess.get_vendors_by_skill(this.db, this.USER_COLL, paging, skill)
    
        const users = await invoke_getlist()
        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, users))
    }

    get_user = async(req, res) => {
        const username = req.params.username
        var validation = validator().validate(username).isNotEmpty().isEmail()
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            const invoke_getone = async() => await mgaccess.get_one(this.db, this.USER_COLL, { username: username })
    
            const user = await invoke_getone()
    
            if (user) {
                res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, user))
            } else {
                res.status(HttpStatus.OK).json(build_response(HttpStatus.NOT_FOUND, NOTFOUND_MSG, username))
            }
        }
    }

    get_user_ex = async(req, res) => {
        const username = req.params.username
        var validation = validator().validate(username).isNotEmpty().isEmail()
    
        const paging = build_paging(req)
        paging.filter = { username: username }
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            const invoke_getone = async() => await mgaccess.get_users(this.db, this.USER_COLL, paging)
            const user = await invoke_getone()
    
            if (user) {
                res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, user[0]))
            } else {
                res.status(HttpStatus.NOT_FOUND).json(build_response(HttpStatus.NOT_FOUND, NOTFOUND_MSG, username))
            }
        } 
    }

    update_user = async(req, res) => {
        const user = req.body
        var validation = validator().validate(user.id).isNotNull().and.isNotEmpty().isMongoObjectId()
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            const id = user.id
            delete user['id']
    
            const invoke_updateone = async() => await mgaccess.update_one(this.db, this.USER_COLL, id, user)
    
            const users = await invoke_updateone()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', users))
        }
    }

    delete_user = async(req, res) => {
        const id = req.params.id
        var validation = validator().validate(id).isNotEmpty().isMongoObjectId()
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            const invoke_updateone = async() => await mgaccess.deleteOne(this.db, this.USER_COLL, id)
    
            const users = await invoke_updateone()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', users))
        }
    }

    create_user = async(req, res) => {
        const user = req.body
        const validation = validateClient(user)
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            const invoke_updateone = async() => await mgaccess.create(this.db, this.USER_COLL, user)
    
            const user = await invoke_updateone()
            res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', user))
        }
    }

    find_city_by_ip = async(req, res) => {
        const ip = req.params.ip
        const validation = validator().validate(ip).isNotEmpty().isIP()
        const service_url = `${find_city_service}?host=${ip}`
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            (async() => {
                try {
                    const result = this.cache.get(ip)
                    if (result !== undefined) {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, result))
                    } else {
                        const response = await fetch(service_url) //, { json: true, headers: { accept: '*/*', connection: 'keep-alive' } })
                        const json = await response.json()
                        this.cache.set(ip, json)
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, json))
                    }
                } catch (err) {
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, PROVIDER_MSG, err))
                }
            })()
    
        }
    }

    find_location_by_address = async(req, res) => {
        const address = req.params.addr

        const validation = validator().validate(address).isNotEmpty()
        const service_url = `${common.google_api}/geocode/json?address=${address}&key=${common.api_key}`

        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            (async() => {
                try {
                    const result = this.cache.get(address)
                    if (result !== undefined) {
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, result))
                    } else {
                        const response = await fetch(service_url)
                        const json = await response.json()
                        this.cache.set(address, json)
                        res.status(HttpStatus.OK).json(build_response(HttpStatus.OK, '', 0, json))
                    }
                } catch (err) {
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(build_response(HttpStatus.INTERNAL_SERVER_ERROR, PROVIDER_MSG, err))
                }
            })()
        }
    }
}