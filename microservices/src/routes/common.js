'use strict'

export const app_name = process.env.APP_NAME
export const version = process.env.APP_VERSION
export const build = process.env.APP_BUILD

export const database_host = process.env.DB_HOST || 'localhost'
export const database = process.env.TASK_DATABASE || 'nodata'

export const database_uri = `mongodb://${database_host}/${database}`