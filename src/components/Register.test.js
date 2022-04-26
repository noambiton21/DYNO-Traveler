import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Register from "./Register";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import ReactTestUtils from "react-dom/test-utils";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Register></Register>, div);
});

test("render with correct text", () => {
  const component = render(<Register />);
  const register = component.getByTestId("Register");
  expect(register.textContent).toBe("Register");
});
