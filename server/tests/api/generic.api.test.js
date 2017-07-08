const app = require("../../app");
const request = require("supertest");

// describing the get root route default to be 404 error message
// describe("GET /", () => {
//   it("responds with a 404 and error message in json", (done) => {
//     request(app)
//       .get("/")
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(404, { message: "Nothing to see here" }, done);
//   });
// });

// describing the get root route default to be 200 welcome message
describe("GET /", () => {
  it("responds with a 200 and welcome message in json", (done) => {
    request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, { message: "Welcome to the beginning of nothingness." }, done);
  });
});

