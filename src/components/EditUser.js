import React, { useState, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import "firebase/compat/firestore";
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const EditUser = (props) => {
  const [gender, setGender] = useState("Male");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("000-0000000");

  const onPhoneChangeHandler = (phoneInput) => {
    setPhone(phoneInput);
  };

  const onGenderChangeHandler = (genderChoice) => {
    setGender(genderChoice);
  };
  const onNameChangeHandler = (nameInput) => {
    setName(nameInput);
  };

  const onPasswordResetHandler = (event) => {
    event.preventDefault();
    // console.log(auth.currentUser.email);
    sendPasswordResetEmail(auth, auth.currentUser.email)
      .then(() => {
        alert("Password reset");
        props.onSave();
      })
      .catch((error) => {
        alert(error.message);
        // ..
      });
  };
  const onClickHandler = (event) => {
    event.preventDefault();
    if (name === "" || phone === "000-0000000") {
      alert("אחד או יותר מהפרטים חסרים");

      return;
    }
    updateDoc(doc(collection(db, "users"), auth.currentUser.uid), {
      gender,
      name,
      phone,
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
            onPasswordResetHandler(e);
          }}
          type="submit"
        >
          איפוס סיסמה
        </button>
      </form>
    </div>
  );
};

export default EditUser;
