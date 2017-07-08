const app = require("../../app");
const request = require("supertest");

describe("GET /", () => {
  it("responds with a 404 and error message in json", (done) => {
    request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, { message: "Nothing to see here" }, done);
  });
});