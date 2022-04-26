import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import "./DisplayUsers.css";
import AdminEditUser from "./AdminEditUser";

function UserTable(props) {
  const [updateUser, setUpdateUser] = useState(false);

  const toHome = () => {
    setUpdateUser(!updateUser);
  };
  const toEdit = () => {
    setUpdateUser(true);
  };

  async function banUser(e) {
    e.preventDefault();
    const statusRef = doc(db, "users", props.user.id);
    await updateDoc(statusRef, {
      statusUser: "disable",
    });
    alert("המשתמש נחסם בהצלחה");
  }
  async function UnbanUser(e) {
    e.preventDefault();
    const statusRef = doc(db, "users", props.user.id);
    await updateDoc(statusRef, {
      statusUser: "enable",
    });
    alert("החסימה בוטלה בהצלחה");
  }
  async function EditUser(e) {
    e.preventDefault();
    const statusRef = doc(db, "users", props.user.id);
    await updateDoc(statusRef, {
      statusUser: "enable",
    });
    alert("החסימה בוטלה בהצלחה");
  }

  return (
    <div className="user-row">
      <div className="user-likes">
        {props.user.role === "Traveler" ? "מטייל" : "מדריך"}
      </div>
      <div className="user-likes">{props.user.name}</div>
      <div className="user-likes">{props.user.email}</div>
      <div className="user-likes">{props.user.phone}</div>
      <div className="user-likes">{props.user.points}</div>
      <div className="user-likes">{props.user.statusUser}</div>
      <div className="user-likes" onClick={toHome}>
        ערוך
      </div>
      {updateUser ? <AdminEditUser onSave={toHome} user={props.user} /> : <></>}

      <button
        className="user-likes"
        onClick={(e) => {
          banUser(e);
        }}
      >
        חסום
      </button>
      <button
        className="user-likes"
        onClick={(e) => {
          UnbanUser(e);
        }}
      >
        ביטול חסימה
      </button>
    </div>
  );
}

export default UserTable;
