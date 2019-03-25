#!node

'use strict';

import express from 'express';
import dotenv from 'dotenv/config'
import bodyParser from 'body-parser';
import task_router from './routes/task_route';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';

const port = process.env.PORT || process.env.APP_PORT;
const app = express();

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
    flags: 'a'
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// setup the logger
app.use(morgan('combined', {
    stream: accessLogStream
}))

app.use('/api/', task_router);

//start the app server
app.listen(port, () => console.log(`task api listening on port ${port}!`));