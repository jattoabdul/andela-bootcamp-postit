

const jwt = require("jsonwebtoken");

const app = function app(_app) {
		/**
  * API routes.
  */

		// base API Route
  _app.get("/api", (req, res) => {
    res.status(200).send({ message: "Welcome to Andela Bootcamp PostIt Project API" });
  });

  _app.post("/api", (req, res) => {
    res.status(200).send({ message: "Welcome to Andela Bootcamp PostIt Project API" });
  });

		// signup API Route app.post("/api/users/signup", controllers.User.signUp);
		// app.post('/api/users/signin', apiController.signIn); app.get('/api/users',
		// apiController.getAllUsers); app.get('/api/steam',
		// passportConfig.isAuthenticated, passportConfig.isAuthorized,
		// apiController.getSteam); app.get('/api/stripe', apiController.getStripe);
		// app.post('/api/stripe', apiController.postStripe);
};

module.exports = app;
