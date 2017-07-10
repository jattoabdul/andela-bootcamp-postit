"use strict";

var sinon = require("sinon");
var chai = require("chai");
var chaiHttp = require('chai-http');

var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();

chai.use(chaiHttp);

var path = require("path");
// const request = require("supertest");

var Sequelize = require("sequelize");
var sequelizeMockingMocha = require("sequelize-mocking").sequelizeMockingMocha;

var app = require("../../app");

// Importing our models for our unit testing.
var Users = require("../../api/models/users").Users;

// Importing our controllers for our unit testing.

// Importing our routes for our unit testing.
// const Routes = require("../../api/routers/routes.js");


// describe API route
// ===============================

// describe user signup endpoint
describe("POST /api/user/signup", function () {
	it("should should create a new user", function (done) {
		chai.request(app).post("/api/user/signup").type('form').send({
			username: "johndoe",
			email: "johndoe@test.com",
			password: "123jas!",
			fullName: "john doe",
			phoneNumber: "08162740850"
		}).end(function (err, res) {
			assert.strictEqual(res.body.email, "johndoe@test.com", 'email sent is correct');
			// res.body.email.should.equal(email);
			assert.strictEqual(res.body.username, "johndoe", 'username sent is correct');
			// res.body.username.should.equal(username);
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

// describe group model

// describe message model

// describe