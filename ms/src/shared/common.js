'use strict'

exports.app_name = process.env.APP_NAME
exports.version = process.env.APP_VERSION

const database_host = process.env.DB_HOST || 'localhost'
const database = process.env.TASK_DATABASE || 'nodata'

exports.database_host = database_host
exports.database = database
exports.database_uri = `mongodb://${database_host}/${database}`

exports.smtp_service = process.env.SMTP_SERVICE || 'gmail'
exports.smtp_host = process.env.SMTP_HOST
exports.smtp_port = process.env.SMTP_PORT
exports.smtp_ssl = process.env.SMTP_SSL
exports.smtp_user = process.env.SMTP_USER
exports.smtp_password = process.env.SMTP_PW

exports.google_api = process.env.GOOGLE_API
exports.api_key = process.env.API_KEY