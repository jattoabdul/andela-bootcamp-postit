

const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

// const request = require("supertest");

const app = require("../../app");

// describing the GET / root route default to be 200 welcome message
describe("GET / route", () => {
  it("responds with a 200 and welcome message in json", (done) => {
    chai.request(app).get("/").end((err, res) => {
      expect(err).to.be.null;
      expect(res.body.message).to.equal("Welcome to the beginning of nothingness.");
      expect(res).to.have.status(200);
      done();
    });
  });
});

// describing the get all undefined routes to be 404 error message
describe("GET undefined routes", () => {
  it("responds with a 404 and error message in json", (done) => {
    chai.request(app).get("/random").end((err, res) => {
      expect(res.body.message).to.equal("Nothing to see here");
      expect(res).to.have.status(404);
      done();
    });
  });
});
