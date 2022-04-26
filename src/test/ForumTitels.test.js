import React from "react";
import ForumTitles from "../components/Forum/ForumTitles";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ForumTitles></ForumTitles>, div);
});
