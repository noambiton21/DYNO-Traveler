import React from "react";
import AddTopic from "../components/Forum/AddTopic";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddTopic></AddTopic>, div);
});
