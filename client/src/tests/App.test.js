import React from "react";
import ReactDOM from "react-dom";
import App from "./../components/App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(< App />, div);
});

describe("App", () => {
  it("should properly run tests", () => {
    expect(1).toBe(1);
  });
});
