import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import ReactTestUtils from "react-dom/test-utils";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App></App>, div);
});
