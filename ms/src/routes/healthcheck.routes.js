/* eslint-disable no-unused-vars */
import express from 'express'
import HttpStatus from 'http-status-codes'
import asyncHandler from 'express-async-handler'

const router = express.Router({})

router.get('/', asyncHandler(async (req, res, next) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    }
    
    try {
        res.status(HttpStatus.OK).json(healthcheck)
    } catch (e) {
        healthcheck.message = e
        res.status(HttpStatus.SERVICE_UNAVAILABLE).send()
    }
}))

// export router with all routes included
module.exports = router