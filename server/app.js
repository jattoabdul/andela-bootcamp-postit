const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger("dev"));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// A catch-all route for anything the api(webservice) does not define.
// app.get("*", (req, res) => res.status(404).send({
//   message: "Nothing to see here",
// }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get("*", (req, res) => res.status(200).send({
  message: "Welcome to the beginning of nothingness.",
}));

module.exports = app;