const path = require('path')
const nodeExternals = require('webpack-node-externals')
const dotenv = require('dotenv-webpack')

module.exports = {
    mode: 'development',
    target: 'node',
    entry: {
        app: ['./src/bill_api.js']
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
        path: path.resolve(__dirname, '../dist/billms/'),
        filename: 'bundle_bill_api.js'
    },
    externals: [nodeExternals()],
}