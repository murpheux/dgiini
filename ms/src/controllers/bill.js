/* eslint-disable no-unused-vars */
'use strict'

import HttpStatus from 'http-status-codes'

import { validateCard } from '../shared/validator'
import VALIDATION_MSG from '../shared/error_messages'
import { build_response, options, build_paging, enrich_paging } from '../shared/service.library'

export class BillController {

    constructor(dbContext) {
        this.db = dbContext
    }

    add_card = async (req, res) => {
        const card = req.body
        const validation = validateCard(card)
    
        if (validation.hasErrors()) {
            res.status(HttpStatus.BAD_REQUEST).json(build_response(HttpStatus.BAD_REQUEST, VALIDATION_MSG, validation.getErrors()))
        } else {
            res.status(HttpStatus.OK).json({})
        }
    }

    get_card = async (_req, res) => {
        res.status(HttpStatus.OK).json({})
    }

    bill_card = async (_req, res) => {
        res.status(HttpStatus.OK).json({})
    }
}