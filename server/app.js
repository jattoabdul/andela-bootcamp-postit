import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import routes from "./api/routers/routes";

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger("dev"));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// importing all Controllers Importing all Models

/**
 * Default routes.
*/

// Setup a default root route that sends back a welcome message in JSON format.
app.get("/", (req, res) => {
  res
    .status(200)
    .send({ message: "Welcome to the beginning of nothingness." });
});

/**
 * API routes call.
*/

routes(app);

module.exports = app;
