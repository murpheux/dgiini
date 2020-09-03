/* eslint-disable no-console */
'use strict'

import config from 'dotenv/config'
import { createLightship } from 'lightship'
import review_router from './routes/review.routes'
import asyncHandler from 'express-async-handler'
import { create_app_server, not_found, authorize } from './shared/service.library'

const app_name = 'review'

const port = process.env.PORT || process.env.REVIEW_API_PORT
const configuration = { detectKubernetes: true, port: 5005 }
const lightship = createLightship(configuration)
const app = create_app_server(app_name)

// check configuration
if (config.error) { throw config.error }

app.use(`/api/${app_name}/v1/`, authorize, review_router)

// 404
app.use(asyncHandler(not_found))

//start the app server
const server = app.listen(port, () => { console.log(`${app_name} api listening on port ${port}!`) })

lightship.registerShutdownHandler(() => { server.close() })
lightship.signalReady()