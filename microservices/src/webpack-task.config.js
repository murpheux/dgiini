const path = require('path')
const nodeExternals = require('webpack-node-externals')
const dotenv = require('dotenv-webpack')

module.exports = {
    mode: 'development',
    target: 'node',
    entry: {
        app: ['./src/task_api.js']
    },
    plugins: [
        new dotenv({
            path: '.env',
            safe: true,
            systemvars: true,
            silent: true,
            defaults: false
        })
    ],
    output: {
        path: path.resolve(__dirname, '../build/taskms/'),
        filename: 'bundle_task_api.js'
    },
    externals: [nodeExternals()],
}