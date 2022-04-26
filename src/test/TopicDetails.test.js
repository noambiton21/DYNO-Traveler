import React from "react";
import TopicDetail from "../components/Forum/TopicDetail";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TopicDetail></TopicDetail>, div);
});
