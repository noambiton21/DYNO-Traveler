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
import UsersList from "./UsersList";
import "./MakeAdmin.css";

function MakeAdmin() {
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
      <div className="makeadmin-row">
        <div className="makeadmin-column">
          <h3>Role</h3>
        </div>
        <div className="makeadmin-column">
          <h3>שם מלא</h3>
        </div>
        <div className="makeadmin-column">
          <h3>Email</h3>
        </div>
        <div className="makeadmin-column">
          <h3>מספר טלפון</h3>
        </div>
        <div className="makeadmin-column">
          <h3>הפוך לאדמין</h3>
        </div>
        <div className="makeadmin-column">
          <h3>בטל אדמין</h3>
        </div>
      </div>
      {usersList
        .filter((user) => {
          return user.role === "Admin";
        })
        .map((user) => (
          <UsersList key={user.id} user={user} />
        ))}
      {usersList
        .filter((user) => {
          return user.role === "Traveler";
        })
        .map((user) => (
          <UsersList key={user.id} user={user} />
        ))}
      {usersList
        .filter((user) => {
          return user.role === "Guide";
        })
        .map((user) => (
          <UsersList key={user.id} user={user} />
        ))}
    </div>
  );
}

export default MakeAdmin;
