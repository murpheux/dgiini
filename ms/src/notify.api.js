/* eslint-disable no-console */
'use strict'

import config from 'dotenv/config'
import { createLightship } from 'lightship'
import asyncHandler from 'express-async-handler'
import notify_router from './routes/notify.routes'
import { create_app_server, not_found, authorize } from './shared/service.library'

const app_name = 'notify'

const port = process.env.PORT || process.env.NTF_API_PORT
const lightship = createLightship()
const app = create_app_server(app_name)

// check configuration
if (config.error) { throw config.error }

app.use(`/api/${app_name}/v1/`, authorize, notify_router)

// 404
app.use(asyncHandler(not_found))

//start the app server
const server = app.listen(port, () => { console.log(`${app_name} api listening on port ${port}!`) })

lightship.registerShutdownHandler(() => { server.close() })
lightship.signalReady()