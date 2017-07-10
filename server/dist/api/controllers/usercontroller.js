"use strict";

/**
 * User Controller
 * handles every user related task and authentication
 */

// importing services
var jwt = require("jsonwebtoken");
var Users = require("../models/users").Users;

module.exports = {
  // Signup Users (create user and save to db)
  signUp: function signUp(req, res, next) {
    Users.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber
    }).then(function (user) {
      res.status(201).send(user);
    }).catch(function (error) {
      res.status(400).send(error);
    });
  }
};