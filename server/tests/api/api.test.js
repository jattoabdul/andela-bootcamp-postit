const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require('chai-http');

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

chai.use(chaiHttp);


const path = require("path");
// const request = require("supertest");

const Sequelize = require("sequelize");
const sequelizeMockingMocha = require("sequelize-mocking").sequelizeMockingMocha;

const app = require("../../app");

// Importing our models for our unit testing.
const Users = require("../../api/models/users").Users;

// Importing our controllers for our unit testing.

// Importing our routes for our unit testing.
// const Routes = require("../../api/routers/routes.js");


// describe API route
// ===============================

// describe user signup endpoint
describe("POST /api/user/signup", () => {
	it("should should create a new user", (done) => {
		chai.request(app)
		.post("/api/user/signup")
		.type('form')
		.send({
			username: "johndoe",
			email: "johndoe@test.com",
			password: "123jas!",
			fullName: "john doe",
      phoneNumber: "08162740850"
		})
   	.end((err, res) => {
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
describe("POST /api/user/signin", () => {

});

// describe create group endpoint
describe("POST /api/group", () => {

});

// describe group member addition endpoint
describe("POST /api/group/:gid/user", () => {

});

// describe send message to a group by a logged in user endpoint
describe("POST /api/group/:gid/message", () => {

});

// describe retrieve/receive group messages endpoint
describe("GET /api/group/:gid/messages", () => {

});

// describe group model

// describe message model

// describe
