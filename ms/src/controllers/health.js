/* eslint-disable no-unused-vars */
import HttpStatus from 'http-status-codes'


export const health_check = async (req, res, next) => {
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
}
