import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import routes from "./api/routers/routes";

const path = require("path");
// Set up the express app
const app = express();

// for serving static react client app on heroku
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "../client/build")));
}

// for serving static react client app on development machine - uncomment below
// app.use("/", express.static(path.join(__dirname, "../client/build")));
// app.use(express.static(path.join(__dirname, "../client/build"))); // 1

// Log requests to the console.
app.use(logger("dev"));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// importing all Controllers 
// importing all Models

/**
 * Default routes.
*/
// testing client side routing on server
// app.get("/", (req, res) => {
//   res
//     .status(200)
//     // .sendFile("index.html", { 
//     //   root: path.join(__dirname, "../client/build")
//     // });
//     .sendFile(path.join(__dirname, "../client/build", "index.html"));
// }); // 2

// Comment this out in production
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
