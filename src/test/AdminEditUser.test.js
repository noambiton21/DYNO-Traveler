import React from "react";
import AdminEditUser from "../components/Admin/AdminEditUser";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AdminEditUser></AdminEditUser>, div);
});
