import React, { useState } from "react";
import { db } from "../../firebase-config";
import { collection, doc, updateDoc } from "firebase/firestore";

function AdminEditUser(props) {
  const [gender, setGender] = useState("Male");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("000-0000000");
  const [points, setPoints] = useState(Number(0));

  const onPointsChangeHandler = (points) => {
    setPoints(points);
  };

  const onPhoneChangeHandler = (phoneInput) => {
    setPhone(phoneInput);
  };

  const onGenderChangeHandler = (genderChoice) => {
    setGender(genderChoice);
  };
  const onNameChangeHandler = (nameInput) => {
    setName(nameInput);
  };
  const onCloseHandler = (e) => {
    e.preventDefault();
    props.onSave();
  };

  const onClickHandler = (event) => {
    event.preventDefault();
    if (name === "" || phone === "000-0000000") {
      alert("אחד או יותר מהפרטים חסרים");

      return;
    }
    updateDoc(doc(collection(db, "users"), props.user.id), {
      gender,
      name,
      phone,
      points,
    })
      .catch((error) => {
        alert(error);
      })
      .then(() => {
        alert("Success");
        props.onSave();
      });
  };
  return (
    <div className="editUser">
      <form>
        <h1 data-testid="header">Edit</h1>

        <input
          className="LoginRegisterIn"
          placeholder="שם מלא"
          onChange={(input) => {
            onNameChangeHandler(input.target.value);
          }}
          type="text"
        />
        <select
          onChange={(input) => {
            onGenderChangeHandler(input.target.value);
          }}
          id="UserType"
          type="userType"
        >
          <option value="Male">זכר</option>
          <option value="Female">נקבה</option>
          <option value="DontHave">אחר</option>
        </select>
        <input
          className="LoginRegisterIn"
          placeholder=" מספר טלפון"
          onChange={(input) => {
            onPhoneChangeHandler(input.target.value);
          }}
          type="text"
        />
        <input
          className="LoginRegisterIn"
          placeholder=" ניקוד"
          onChange={(input) => {
            onPointsChangeHandler(input.target.value);
          }}
          type="text"
        />
        <button
          className="btn btn-primary btn-block btn-large"
          onClick={(e) => {
            onClickHandler(e);
          }}
          type="submit"
        >
          שמור
        </button>
        <button
          className="btn btn-primary btn-block btn-large"
          onClick={(e) => {
            onCloseHandler(e);
          }}
        >
          סגור
        </button>
      </form>
    </div>
  );
}

export default AdminEditUser;
