'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _db = require('../models/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * User Controller
 * handles every user related task and authentication
 */

// importing services
exports.default = {
  // Signup Users (create user and save to db)
  signUp: function signUp(req, res) {
    return _db2.default.Users.create({
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
  },
  authenticate: function authenticate(req, res) {
    _db2.default.Users.findAll({ where: { username: [req.body.username], password: [req.body.password] } }).then(function (user) {
      if (user[0]) {
        // create a token
        var token = _jsonwebtoken2.default.sign({
          data: user[0]
        }, 'Jasabs93', { expiresIn: '30m' });

        res.status(202).send({
          token: token,
          message: 'successful login'
        });
        return;
      }

      res.status(404).send({
        message: 'user not found'
      });
    });
  },
  getUsers: function getUsers(req, res) {
    return _db2.default.Users.findAll().then(function (users) {
      return res.status(200).send(users);
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  }
};