'use strict'

exports.app_name = process.env.APP_NAME
exports.version = process.env.APP_VERSION
exports.build = process.env.APP_BUILD

const database_host = process.env.DB_HOST || 'localhost'
const database = process.env.TASK_DATABASE || 'nodata'

exports.database_host = database_host
exports.database = database
exports.database_uri = `mongodb://${database_host}/${database}`