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

function UsersList(props) {
  async function MakeAdmin(e) {
    e.preventDefault();
    const statusRef = doc(db, "users", props.user.id);
    await updateDoc(statusRef, {
      role: "Admin",
    });
    alert("המשתמש " + props.user.name + " הפך לאדמין ");
  }
  async function RemoveAdmin(e) {
    e.preventDefault();
    const statusRef = doc(db, "users", props.user.id);
    await updateDoc(statusRef, {
      role: "Traveler",
    });
    alert("המשתמש " + props.user.name + " הורד מאדמין ");
  }

  return (
    <div className="admin-row">
      <h4 className="admin-role">
        {props.user.role === "Traveler"
          ? "מטייל"
          : props.user.role === "Guide"
          ? "מדריך"
          : "אדמין"}
      </h4>
      <div className="admin-designrow">{props.user.name}</div>
      <div className="admin-designrow">{props.user.email}</div>
      <div className="admin-designrow">{props.user.phone}</div>
      <button
        className="admin-designrow-btn"
        onClick={(e) => {
          MakeAdmin(e);
        }}
      >
        <h3>הפוך לאדמין</h3>
      </button>
      <button
        className="unadmin-designrow-btn"
        onClick={(e) => {
          RemoveAdmin(e);
        }}
      >
        <h3>בטל אדמין</h3>
      </button>
    </div>
  );
}

export default UsersList;
