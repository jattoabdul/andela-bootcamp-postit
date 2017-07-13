import chai from "chai";
import chaiHttp from "chai-http";
// import sinon from "sinon";
// import path from "path";
// import sequelize from "sequelize";

// import app
import app from "../app";

// import my models for unit testing
// import models from "../api/models/db";

// importing my controllers for unit testing

// importing my routes for unit testing
process.env.NODE_ENV = "test";

// const sequelizeMockingMocha from "sequelize-mocking".sequelizeMockingMocha;

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

chai.use(chaiHttp);
// const request = require("supertest");

// global variables
let authToken;

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


models
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
  .GroupsUsers
  .destroy({
    where: {},
    cascade: true,
    truncate: true
  });

/* describe API route
* ===============================
*/

// describe user signup endpoint
describe("POST /api/users/signup", () => {
  it("should should create a new user", (done) => {
    chai
      .request(app)
      .post("/api/users/signup")
      .type("form")
      .send({
        username: "johndoe",
        email: "johndoe@test.com",
        password: "123jas",
        fullName: "john doe",
        phoneNumber: "08162740850"
      })
      .end((err, res) => {
        console.log(res.body);
        assert.strictEqual(
          res.body.email,
          "johndoe@test.com",
          "email sent is correct"
        );
        // res.body.email.should.equal(email);
        // res.body.email.should.equal("johndoe@test.com");
        assert.strictEqual(
          res.body.username,
          "johndoe",
          "username sent is correct"
        );
        // res.body.username.should.equal(username);
        // res.should.have.status(201);
        // get user and check if user details has been correctly created in db
        expect(res).to.have.status(201);
        done();
      });
  });

  it("should raise an error if email exist", (done) => {
    chai.request(app)
      .post("/api/users/signup/")
      .type("form")
      .send({
        username: "johndoe",
        email: "johndoe@test.com",
        password: "123jas",
        fullName: "john doe",
        phoneNumber: "08162740850"
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("should raise an error if username exist", (done) => {
    chai.request(app)
      .post("/api/users/signup/")
      .type("form")
      .send({
        username: "johndoe",
        email: "johndoe@test.com",
        password: "123jas",
        fullName: "john doe",
        phoneNumber: "08162740850"
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  // it should only accept 8 digits of passwords
});

// describe user signin/login endpoint
describe("POST /api/user/signin", () => {
  // it should login user and return auth token
  it("should login user and return auth token", (done) => {
    chai.request(app)
      .post("/api/users/signin/")
      .type("form")
      .send({
        username: "johndoe",
        password: "123jas"
      })
      .end((err, res) => {
        res.should.have.status(202);
        // res.body.token.should.not.equals(null);
        authToken = res.body.token; // set authToken
        done();
      });
  });
  // it should reject invalid logincand respond 401 error
  it("should reject login if user does not exist", (done) => {
    chai.request(app)
      .post("/api/users/signin/")
      .type("form")
      .send({
        username: "johndoesss",
        password: "123jased"
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal("username not found, please register");
        done();
      });
  });
  // it should only accept alphanumeric
});

// describe protection of routes (if routes well protected)
describe("Routes are protected", () => {
  // create groups routes
  it("should check if POST /api/groups/ is protected", (done) => {
    chai.request(app)
      .post("/api/groups/")
      .type("form")
      .send({
        name: "andelabootcamp24",
        desc: "campers group for cycle 24",
        isArchived: "0",
        UsersId: 1
      })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  // view list of groups
  it("should check if GET /api/groups/ is protected", (done) => {
    chai.request(app)
      .get("/api/groups/")
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  // add member route
  it("should check if POST /api/groups/:id/user is protected", (done) => {
    chai.request(app)
      .post("/api/groups/1/user")
      .type("form")
      .send({
        UsersId: 1,
        GroupsId: 1,
        isAdmin: "0"
      })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  // remove member route
  it("should check if DELETE /api/groups/:id/user is protected", (done) => {
    chai.request(app)
      .post("/api/groups/1/user")
      .type("form")
      .send({
        UsersId: 1,
        GroupsId: 1
      })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  // view member route
  it("should check if GET /api/groups/:id/users is protected", (done) => {
    chai.request(app)
      .get("/api/groups/1/users")
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  // send message route
  it("should check if POST /api/groups/:id/message/ is protected", (done) => {
    chai.request(app)
      .post("/api/groups/1/message/")
      .type("form")
      .send({
        userId: 1,
        text: "some message content test",
        groupId: 1,
        priority: 1
      })
      .end((err, res) => {
        res.status.should.equal(401);
        done();
      });
  });

  // get messages route
  it("should check if GET /api/groups/:id/messages is protected", (done) => {
    chai.request(app)
      .get("/api/groups/1/messages")
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// describe create group endpoint
describe("POST /api/group", () => {
  it("should create POST /api/groups/ New Group", (done) => {
    chai.request(app)
      .post("/api/groups/")
      .set("x-access-token", authToken)
      .type("form")
      .send({
        name: "Test Group 1",
        desc: "Test Group Description 1",
        isArchived: "0",
        UsersId: "1"
      })
      .end((err, res) => {
        res.should.have.status(201);
        assert.strictEqual(
          res.body.group.name,
          "Test Group 1",
          "group created with correct name"
        );
        done();
      });
  });

  it("should check if group name is not provided to POST /api/groups/",
    (done) => {
      chai.request(app)
        .post("/api/groups/")
        .set("x-access-token", authToken)
        .type("form")
        .send({
          desc: "Test Group Description 1",
          isArchived: "0",
          UsersId: "1"
        })
        .end((err, res) => {
          res.should.have.status(400);
          assert.strictEqual(
            res.body.message,
            "Name parameter is required",
            "group created not given in a name"
          );
          done();
        });
    });

  it("should GET get all created groups via /api/groups/", (done) => {
    chai.request(app)
      .get("/api/groups/")
      .set("x-access-token", authToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        assert.isAtLeast(res.body.length, 1, "length of group >= 1");
        done();
      });
  });
});

// describe group member addition endpoint
describe("POST /api/groups/:id/user", () => {
  it("should add user to a group-1 via POST /api/groups/:id/user", (done) => {
    chai.request(app)
      .post("/api/groups/1/user")
      .set("x-access-token", authToken)
      .type("form")
      .send({
        GroupsId: 1,
        isAdmin: "0"
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});

// describe send message to a group by a logged in user endpoint
describe("POST /api/group/:id/message", () => {
  it("shoul send a message to a group via POST /api/groups/:id/message/",
    (done) => {
      chai.request(app)
        .post("/api/groups/1/message/")
        .set("x-access-token", authToken)
        .type("form")
        .send({
          userId: "1",
          text: "my test message 2",
          groupId: "1",
          priority: "0"
        })
        .end((err, res) => {
          res.status.should.equal(201);
          // console.log(res.body);
          assert.strictEqual(
            res.body.text,
            "my test message 2",
            "message sent with rght data"
          );
          done();
        });
    });

  it("should not send message if text empty via POST /api/groups/:id/message/",
    (done) => {
      chai.request(app)
        .post("/api/groups/1/message/")
        .set("x-access-token", authToken)
        .type("form")
        .send({
          userId: "1",
          groupId: "1",
          priority: "0"
        })
        .end((err, res) => {
          res.status.should.equal(400);
          done();
        });
    });
});

// describe retrieve/receive group messages endpoint
describe("GET /api/group/:id/messages", () => {});

// describe group model 

// describe message model


// describing the get all undefined routes to be 404 error message
// describe("GET undefined routes", () => {
//   it("responds with a 404 and error message in json", (done) => {
//     chai
//       .request(app)
//       .get("/random")
//       .end((err, res) => {
//         expect(res.body.message)
//           .to
//           .equal("trying to get? Nothing to see here");
//         expect(res)
//           .to
//           .have
//           .status(404);
//         done();
//       });
//   });
// });
