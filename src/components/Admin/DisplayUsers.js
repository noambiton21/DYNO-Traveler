import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import "./DisplayUsers.css";
import UserTable from "./UserTable";

function DisplayUsers() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(collection(db, "users"));
      setUsersList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <div className="box-users">
      <div className="subuser-row">
        <div className="subuser-column">
          <h3>Role</h3>
        </div>
        <div className="subuser-column">
          <h3>שם מלא</h3>
        </div>
        <div className="subuser-column">
          <h3>Email</h3>
        </div>
        <div className="subuser-column">
          <h3>מספר טלפון</h3>
        </div>
        <div className="subuser-column">
          <h3>נקודות</h3>
        </div>
        <div className="subuser-column">
          <h3>מצב משתמש</h3>
        </div>
        <div className="subuser-column">
          <h3>ערוך משתמש</h3>
        </div>
        <div className="subuser-column">
          <h3>Ban</h3>
        </div>
        <div className="subuser-column">
          <h3>unBan</h3>
        </div>
      </div>
      {usersList
        .filter((user) => {
          return user.role === "Traveler";
        })
        .map((user) => (
          <UserTable key={user.id} user={user} />
        ))}
      {usersList
        .filter((user) => {
          return user.role === "Guide";
        })
        .map((user) => (
          <UserTable key={user.id} user={user} />
        ))}
    </div>
  );
}

export default DisplayUsers;
