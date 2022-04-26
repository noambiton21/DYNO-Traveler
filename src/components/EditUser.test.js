import React from "react";
import { render, fireEvent } from "@testing-library/react";
import EditUser from "./EditUser";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import ReactTestUtils from "react-dom/test-utils";

test("render with correct text", () => {
  const component = render(<EditUser />);
  const headerEl = component.getByTestId("header");

  expect(headerEl.textContent).toBe("Edit");
});

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<EditUser></EditUser>, div);
});
