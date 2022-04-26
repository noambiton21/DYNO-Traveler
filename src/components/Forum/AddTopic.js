import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import "firebase/compat/firestore";
import "./AddTopic.css";

const AddTopic = (props) => {
  const fullDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;

    return today;
  };
  const [title, setTitle] = useState("");
  const [openDate, setOpenDate] = useState(fullDate());
  const [lastDate, setLaseDate] = useState(fullDate());
  const [commentsNum, setCommentsNum] = useState(Number(1));
  const [likes, setLikes] = useState(Number(0));
  const [mainContent, setMainContent] = useState("");
  const [category, setCategory] = useState("דיון|");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  // const userId = auth.currentUser.uid;
  // const userEmail = auth.currentUser.email;

  useEffect(() => {
    setUserId(auth.currentUser.uid);
    setUserEmail(auth.currentUser.email);
  }, []);

  const onTitleChange = (newTitle) => {
    setTitle(newTitle);
  };
  const onContentChange = (newContent) => {
    setMainContent(newContent);
  };
  const onCategoryChangeHandler = (categoryChoice) => {
    setCategory(categoryChoice);
  };

  const onClickHandler = (event) => {
    event.preventDefault();
    props.onAddClick();
    const newTopic = {
      title: title,
      openDate: openDate,
      commentsNum: commentsNum,
      likes: likes,
      lastDate: lastDate,
      mainContent: mainContent,
      userId: userId,
      category: category,
      userEmail: userEmail,
      lockStatus: "open",
    };
    props.onAddTopic(newTopic);
  };

  return (
    <div className="add-task-list">
      <div>
        <select
          className="category"
          onChange={(input) => {
            onCategoryChangeHandler(input.target.value);
          }}
          id="UserType"
          type="userType"
        >
          <option value="דיון|">דיון</option>
          <option value="בעיה|">בעיה</option>
          <option value="שאלה|">שאלה</option>
          <option value="מידע|">מידע</option>
        </select>
      </div>
      <div className="topic">
        <input
          className="topicInput"
          type="text"
          placeholder="כותרת"
          onChange={(input) => {
            onTitleChange(input.target.value);
          }}
        />
      </div>
      <div className="enterText">
        <textarea
          className="textArea"
          rows="4"
          cols="50"
          type="text"
          placeholder="הוסף את המלל פה"
          onChange={(input) => {
            onContentChange(input.target.value);
          }}
        />
      </div>
      <div className="buttons">
        <input
          className="button-save"
          type="submit"
          value="שמור"
          onClick={(e) => {
            onClickHandler(e);
          }}
        />
        <button className="button-close" onClick={props.onAddClick}>
          סגור
        </button>
      </div>
    </div>
  );
};

export default AddTopic;
