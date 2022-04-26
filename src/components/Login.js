import React, { useState } from "react";
import { auth, db } from "../firebase-config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import Register from "./Register";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onForgotPassword = (e) => {
    e.preventDefault();
    onPasswordResetHandler(email);
  };
  const onEmailChangeHandler = (emailInput) => {
    setEmail(emailInput);
  };
  const onPasswordChangeHandler = (passwordInput) => {
    setPassword(passwordInput);
  };

  const onPasswordResetHandler = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset");
      })
      .catch((error) => {
        alert("לא הזנת סיסמה");
      });
  };

  const onClickHandler = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;
        getDoc(
          doc(
            collection(db, "logins"),
            "OQI4zFeoRwa01feiYVItSqt2fSMuT4LFdApcXUJUf8"
          )
        )
          .then((res) => {
            let myNumber = res.data().number;
            setDoc(
              doc(
                collection(db, "logins"),
                "OQI4zFeoRwa01feiYVItSqt2fSMuT4LFdApcXUJUf8"
              ),
              { number: myNumber + 1 }
            );
          })
          .catch((error) => {
            let myNumber = 0;
            setDoc(
              doc(
                collection(db, "logins"),
                "OQI4zFeoRwa01feiYVItSqt2fSMuT4LFdApcXUJUf8"
              ),
              { number: myNumber + 1 }
            );
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("שם משתמש או סיסמה שגויים");
      });
  };

  return (
    <div className="auth-wrapper">
      <div className="login">
        <h1 data-testid="LOGIN">Login</h1>
        <form>
          <input
            className="LoginRegisterIn"
            placeholder="הכנס כתובת Email"
            onChange={(input) => {
              onEmailChangeHandler(input.target.value);
            }}
            type="text"
          />
          <input
            className="LoginRegisterIn"
            placeholder="הכנס סיסמה"
            onChange={(input) => {
              onPasswordChangeHandler(input.target.value);
            }}
            type="password"
          />
          <button
            className="btn btn-primary btn-block btn-large"
            onClick={(e) => {
              onClickHandler(e);
            }}
            type="submit"
          >
            Login
          </button>
          <p className="signnow">
            <button onClick={props.onSwitchPages}>הרשם עכשיו</button>
            ?עדין לא רשום
          </p>
          <button
            className="btn btn-primary btn-block btn-large"
            onClick={onForgotPassword}
          >
            שכחתי סיסמה
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
