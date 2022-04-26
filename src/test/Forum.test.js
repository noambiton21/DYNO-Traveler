import React from "react";
import Forum from "../components/Forum/Forum";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Forum></Forum>, div);
});
