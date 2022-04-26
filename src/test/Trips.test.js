import React from "react";
import Trips from "../components/Trips/Trips";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Trips></Trips>, div);
});
