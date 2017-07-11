"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require("./api/routers/routes");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// Set up the express app
var app = (0, _express2.default)();

// Log requests to the console.
app.use((0, _morgan2.default)("dev"));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// importing all Controllers Importing all Models

/**
 * Default routes.
*/

// Setup a default root route that sends back a welcome message in JSON format.
app.get("/", function (req, res) {
  res.status(200).send({ message: "Welcome to the beginning of nothingness." });
});

/**
 * API routes call.
*/

(0, _routes2.default)(app);

/**
 * NOT FOUND routes.
*/
// A catch-all route for anything the api(webservice) does not define.
app.post("*", function (req, res) {
  res.status(404).send({ message: "Nothing to see here" });
});

app.get("*", function (req, res) {
  res.status(404).send({ message: "Nothing to see here" });
});

module.exports = app;