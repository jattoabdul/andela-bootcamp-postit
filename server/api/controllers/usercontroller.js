/**
 * User Controller
 * handles every user related task and authentication
 */

// importing services
const jwt = require("jsonwebtoken");
const Users = require("../models/users").Users;

module.exports = {
	// Signup Users (create user and save to db)
	signUp(req,res,next){
      Users
      .create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber
      })
      .then((user) => {
      	res.status(201).send(user);
      })
      .catch((error) => {
      	res.status(400).send(error);
      });
	},

}