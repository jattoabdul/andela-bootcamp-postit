"use strict";

var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var routes = require("./api/routers/routes");

// Set up the express app
var app = express();

// Log requests to the console.
app.use(logger("dev"));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//importing all Controllers

// Importing all Models


/**
 * Default routes.
*/

// Setup a default root route that sends back a welcome message in JSON format.
app.get("/", function (req, res) {
  res.status(200).send({
    message: "Welcome to the beginning of nothingness."
  });
});

/**
 * API routes call.
*/

routes(app);

/**
 * NOT FOUND routes.
*/
// A catch-all route for anything the api(webservice) does not define.
app.post("*", function (req, res) {
  res.status(404).send({
    message: "Nothing to see here"
  });
});

app.get("*", function (req, res) {
  res.status(404).send({
    message: "Nothing to see here"
  });
});

module.exports = app;