"use strict";

var jwt = require("jsonwebtoken");
var controllers = require("../controllers/controllers");
var Users = require("../models/users").Users;

var app = function app(_app) {

	/**
  * API routes.
 */

	// base API Route
	_app.get("/api", function (req, res) {
		res.status(200).send({
			message: "Welcome to Andela Bootcamp PostIt Project API"
		});
	});

	_app.post("/api", function (req, res) {
		res.status(200).send({
			message: "Welcome to Andela Bootcamp PostIt Project API"
		});
	});

	// signup API Route
	_app.post("/api/users/signup", controllers.User.signUp);

	// app.post('/api/users/signin', apiController.signIn);
	// app.get('/api/users', apiController.getAllUsers);
	// app.get('/api/steam', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getSteam);
	// app.get('/api/stripe', apiController.getStripe);
	// app.post('/api/stripe', apiController.postStripe);
};

module.exports = app;