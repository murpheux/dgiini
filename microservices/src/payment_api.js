#!node

'use strict';

import express from 'express';
import dotenv from 'dotenv/config'
import bodyParser from 'body-parser';
import task_router from './routes/task_route';