import React from "react";
import NewMap from "../components/NewMap";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<NewMap></NewMap>, div);
});
