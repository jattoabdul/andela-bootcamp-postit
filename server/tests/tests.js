import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import path from "path";
import Sequelize from "sequelize";

// import app
import app from "../app";

// import my models for unit testing
import models from "../api/models/db";

/*
// importing my controllers for unit testing

// importing my routes for unit testing
*/

chai.use(chaiHttp);

/*
* import request from "supertest";
* process.env.NODE_ENV = 'test';
*/

/*
* const sequelizeMockingMocha from "sequelize-mocking".sequelizeMockingMocha;
*/

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

// const request = require("supertest");

/*
* describing the GET / root route default
* to be 200 welcome message
*/

describe("GET / route", () => {
  it("responds with a 200 and welcome message in json", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        // expect the response message body to be equal the message sent as JSON
        expect(res.body.message)
          .to
          .equal("Welcome to the beginning of nothingness.");
        // expect response response to have status code 200-OK
        expect(res)
          .to
          .have
          .status(200);
        done();
      });
  });
});

// describing the get all undefined routes to be 404 error message
describe("GET undefined routes", () => {
  it("responds with a 404 and error message in json", (done) => {
    chai
      .request(app)
      .get("/random")
      .end((err, res) => {
        expect(res.body.message)
          .to
          .equal("trying to get? Nothing to see here");
        expect(res)
          .to
          .have
          .status(404);
        done();
      });
  });
});

models
  .Users
  .destroy({
    where: {},
    cascade: true,
    truncate: true
  });
/*
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
describe("POST /api/user/signup", () => {
  it("should should create a new user", (done) => {
    chai
      .request(app)
      .post("/api/user/signup")
      .type("form")
      .send({ 
        username: "johndoe", 
        email: "johndoe@test.com", 
        password: "123jas!", 
        fullName: "john doe", 
        phoneNumber: "08162740850" 
      })
      .end((err, res) => {
        assert.strictEqual(
          res.body.email, 
          "johndoe@test.com", 
          "email sent is correct"
          );
        // res.body.email.should.equal(email);
        assert.strictEqual(
          res.body.username, 
          "johndoe", 
          "username sent is correct"
          );
        // res.body.username.should.equal(username);

        //get user and check if user details has been correctly created in db
        expect(res).to.have.status(201);
        done();
      });
  });
});

// describe user signin/login endpoint
describe("POST /api/user/signin", () => {});

// describe create group endpoint
describe("POST /api/group", () => {});

// describe group member addition endpoint
describe("POST /api/group/:gid/user", () => {});

// describe send message to a group by a logged in user endpoint
describe("POST /api/group/:gid/message", () => {});

// describe retrieve/receive group messages endpoint
describe("GET /api/group/:gid/messages", () => {});

// describe group model describe message model
