#!node
'use strict';

var _express = _interopRequireDefault(require("express"));

var _config = _interopRequireDefault(require("dotenv/config"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _task_route = _interopRequireDefault(require("./routes/task_route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }