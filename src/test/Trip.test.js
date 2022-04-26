import React from "react";
import Trip from "../components/Trips/Trip";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Trip></Trip>, div);
});
