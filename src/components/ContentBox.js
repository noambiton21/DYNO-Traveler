import React from "react";

const ContentBox = (props) => {
  return (
    <div className="container">
      <div className="box">
        <div className="content">
          <h3>{props.title}</h3>
          <p>{props.number1}</p>
          <p>{props.number2}</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
        </div>
      </div>
    </div>
  );
};

export default ContentBox;
