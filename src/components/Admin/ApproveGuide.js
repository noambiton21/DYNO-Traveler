import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import GuideList from "./GuideList";

function ApproveGuide() {
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
      <div className="approve-guide-row">
        <div className="approve-guide-column">
          <h3>שם מלא</h3>
        </div>
        <div className="approve-guide-column">
          <h3>Email</h3>
        </div>
        <div className="approve-guide-column">
          <h3>מספר טלפון</h3>
        </div>
        <div className="approve-guide-column">
          <h3>תעודת מדריך</h3>
        </div>
        <div className="approve-guide-column">
          <h3>אשר</h3>
        </div>
        <div className="approve-guide-column">
          <h3>דחה</h3>
        </div>
      </div>
      {usersList
        .filter((user) => {
          return user.role === "Guide";
        })
        .filter((user) => {
          return user.statusUser === "disable";
        })
        .map((user) => (
          <GuideList key={user.id} user={user} />
        ))}
    </div>
  );
}

export default ApproveGuide;
