import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Login from "./Login";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import ReactTestUtils from "react-dom/test-utils";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Login></Login>, div);
});

test("render with correct text", () => {
  const component = render(<Login />);
  const LOGIN = component.getByTestId("LOGIN");
  expect(LOGIN.textContent).toBe("Login");
});
