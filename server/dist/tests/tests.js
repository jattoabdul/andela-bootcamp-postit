"use strict";

var _chai = require("chai");

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require("chai-http");

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

var _app = require("../app");

var _app2 = _interopRequireDefault(_app);

var _db = require("../api/models/db");

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
// importing my controllers for unit testing

// importing my routes for unit testing
*/

// import app
_chai2.default.use(_chaiHttp2.default);

/*
* import request from "supertest";
* process.env.NODE_ENV = 'test';
*/

/*
* const sequelizeMockingMocha from "sequelize-mocking".sequelizeMockingMocha;
*/

// import my models for unit testing
var expect = _chai2.default.expect;
var assert = _chai2.default.assert;
var should = _chai2.default.should();

// const request = require("supertest");

/*
* describing the GET / root route default
* to be 200 welcome message
*/

describe("GET / route", function () {
  it("responds with a 200 and welcome message in json", function (done) {
    _chai2.default.request(_app2.default).get("/").end(function (err, res) {
      if (err) {
        return done(err);
      }
      // expect the response message body to be equal the message sent as JSON
      expect(res.body.message).to.equal("Welcome to the beginning of nothingness.");
      // expect response response to have status code 200-OK
      expect(res).to.have.status(200);
      done();
    });
  });
});

// describing the get all undefined routes to be 404 error message
describe("GET undefined routes", function () {
  it("responds with a 404 and error message in json", function (done) {
    _chai2.default.request(_app2.default).get("/random").end(function (err, res) {
      expect(res.body.message).to.equal("Nothing to see here");
      expect(res).to.have.status(404);
      done();
    });
  });
});

/*models
  .Users
  .destroy({
    where: {},
    cascade: true,
    truncate: true
  });

models
  .Messages
  .destroy({
    where: {},
    cascade: true,
    truncate: true
  });

models
  .Groups
  .destroy({
    where: {},
    cascade: true,
    truncate: true
  });

models
  .GroupUsers
  .destroy({
    where: {},
    cascade: true,
    truncate: true
  });
  */

/* describe API route
* ===============================
*/

// describe user signup endpoint
describe("POST /api/user/signup", function () {
  it("should should create a new user", function (done) {
    _chai2.default.request(_app2.default).post("/api/user/signup").type("form").send({
      username: "johndoe",
      email: "johndoe@test.com",
      password: "123jas!",
      fullName: "john doe",
      phoneNumber: "08162740850"
    }).end(function (err, res) {
      assert.strictEqual(res.body.email, "johndoe@test.com", "email sent is correct");
      // res.body.email.should.equal(email);
      assert.strictEqual(res.body.username, "johndoe", "username sent is correct");
      // res.body.username.should.equal(username);

      //get user and check if user details has been correctly created in db
      expect(res).to.have.status(201);
      done();
    });
  });
});

// describe user signin/login endpoint
describe("POST /api/user/signin", function () {});

// describe create group endpoint
describe("POST /api/group", function () {});

// describe group member addition endpoint
describe("POST /api/group/:gid/user", function () {});

// describe send message to a group by a logged in user endpoint
describe("POST /api/group/:gid/message", function () {});

// describe retrieve/receive group messages endpoint
describe("GET /api/group/:gid/messages", function () {});

// describe group model describe message model