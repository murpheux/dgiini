#!node
'use strict';

var _express = _interopRequireDefault(require("express"));

var _config = _interopRequireDefault(require("dotenv/config"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _task_route = _interopRequireDefault(require("./routes/task_route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || process.env.APP_PORT;
var app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use('/api/', _task_route.default); //start the app server

app.listen(port, function () {
  return console.log("task api listening on port ".concat(port, "!"));
});