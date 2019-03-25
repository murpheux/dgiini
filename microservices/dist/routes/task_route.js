"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _task = _interopRequireDefault(require("../model/task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.get('/', function (req, res, next) {
  var payload = {
    "payload": "Hello From ImageCompacter service"
  };
  res.json(payload);
});
router.get('/tasks', function (req, res, next) {
  var tasks = [new _task.default('James Coonce'), new _task.default('Bob Coonce'), new _task.default('Euri'), new _task.default('Norman')];
  res.json(tasks);
});
router.post('/tasks', function (req, res) {
  var user = new User(req.body.name, req.body.username, req.body.email);
  res.json(user);
});
var _default = router;
exports.default = _default;