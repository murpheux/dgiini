const appRoot = require('app-root-path')
const winston = require('winston')
const fs = require('fs')

const log_file = process.env.LOG_TARGET || 'logfile.log'
const default_log_folder = 'logs'
const dir = process.env.LOG_PATH || default_log_folder
let log_path_file = `${appRoot}/logs/${log_file}`

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
}

if (dir !== default_log_folder) {
    log_path_file = `${dir}/${log_file}`
}

// define the custom settings for each transport (file, console)
const options = {
    file: {
        level: 'error',
        filename: log_path_file,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 15,
        colorize: false,
    },
    console: {
        level: 'info',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
}

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
})

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function(message) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message)
    },
}

module.exports = logger