'use strict'

exports.app_name = process.env.APP_NAME
exports.version = process.env.APP_VERSION

const database_host = process.env.DB_HOST || 'localhost'
const database = process.env.TASK_DATABASE || 'nodata'
const user = process.env.DB_USER || ''
const password = process.env.DB_PASS || ''
const replica_set = process.env.DB_REPL || ''

exports.database_host = database_host
exports.database = database

const post_uri = `${database_host}/${database}`
let db_uri = user !== '' ? `mongodb://${user}:${password}@${post_uri}` : `mongodb://${post_uri}`
db_uri = replica_set !== '' ? `${db_uri}/?authSource=admin&replicaSet=${replica_set}` : db_uri // include replicaset

// remove newline due to k8s secrets
db_uri = db_uri.replace(/\r?\n|\r/g, '')

exports.database_uri = db_uri

exports.smtp_service = process.env.SMTP_SERVICE || 'gmail'
exports.smtp_host = process.env.SMTP_HOST
exports.smtp_port = process.env.SMTP_PORT
exports.smtp_ssl = process.env.SMTP_SSL
exports.smtp_user = process.env.SMTP_USER
exports.smtp_password = process.env.SMTP_PW

exports.google_api = process.env.GOOGLE_API
exports.api_key = process.env.API_KEY