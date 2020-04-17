/* eslint-disable no-unused-vars */
import express from 'express'
import HttpStatus from 'http-status-codes'
import asyncHandler from 'express-async-handler'
import { health_check } from '../controllers/health'

const router = express.Router({})

router.get('/', asyncHandler(health_check))

// export router with all routes included
module.exports = router