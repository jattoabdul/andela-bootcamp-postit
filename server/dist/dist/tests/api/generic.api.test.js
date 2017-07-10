"use strict";

var chai = require("chai");
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();

// const request = require("supertest");

var app = require("../../app");

// describing the GET / root route default to be 200 welcome message
describe("GET / route", function () {
  it("responds with a 200 and welcome message in json", function (done) {
    chai.request(app).get("/").end(function (err, res) {
      expect(err).to.be.null;
      expect(res.body.message).to.equal("Welcome to the beginning of nothingness.");
      expect(res).to.have.status(200);
      done();
    });
  });
});

// describing the get all undefined routes to be 404 error message
describe("GET undefined routes", function () {
  it("responds with a 404 and error message in json", function (done) {
    chai.request(app).get("/random").end(function (err, res) {
      expect(res.body.message).to.equal("Nothing to see here");
      expect(res).to.have.status(404);
      done();
    });
  });
});