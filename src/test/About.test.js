import React from "react";
import About from "../components/About";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<About></About>, div);
});
