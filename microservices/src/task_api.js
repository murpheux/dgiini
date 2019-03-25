#!node

'use strict';

import express from 'express';
//import dotenv from 'dotenv/config'
import bodyParser from 'body-parser';
import task_router from './routes/task_route';

const port = process.env.PORT || process.env.APP_PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/api/', task_router);

//start the app server
app.listen(port, () => console.log(`task api listening on port ${port}!`));