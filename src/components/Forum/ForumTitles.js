import React from "react";
import "./ForumTitles.css";
import AddTopic from "./AddTopic";
import { useState } from "react";

const ForumTitles = (props) => {
  const [newTopic, setNewTopic] = useState(false);

  const onAddClick = () => {
    setNewTopic(!newTopic);
  };
  if (newTopic) {
    return <AddTopic onAddTopic={props.onAddTopic} onAddClick={onAddClick} />;
  }
  return (
    <div className="conttainer">
      <div className="subforum">
        <div className="subforum-title">
          <h3>פורום</h3>
        </div>
        <div className="subforum-row">
          <button className="newTopic" onClick={onAddClick}>
            <h3>פתיחת נושא חדש</h3>
          </button>
          <div className="subforum-column">
            <h3>נושא</h3>
          </div>
          <div className="subforum-column">
            <h3>כמות תגובות</h3>
          </div>
          <div className="subforum-column">
            <h3>תאריך פתיחה</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumTitles;
