import React from "react";
import Search from "../components/Search";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Search></Search>, div);
});
