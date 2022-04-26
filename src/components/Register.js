import React, { useState, useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, app } from "../firebase-config";
import "firebase/compat/firestore";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase-config";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [role, setRole] = useState("Traveler");
  const [gender, setGender] = useState("Male");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("000-0000000");
  const [points, setPoints] = useState(Number(0));
  const [imagePath, setImagePath] = useState("");
  const [statusUser, setStatusUser] = useState("enable");

  const fullDate = () => {
    let date = new Date();
    return date;
  };

  const uploadFiles = (file, uid) => {
    if (!file) return;
    const storgaeRef = ref(storage, `/auth/${uid}.${file.name.split(".")[1]}`);
    const uploadTask = uploadBytesResumable(storgaeRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) +
            "%"
        );
      },
      (err) => console.log(err)
    );
  };

  const disableGuide = () => {
    setStatusUser("disable");
  };
  const onUploadImage = (uploadImage) => {
    console.log(uploadImage.name.split(".")[1]);
    setImagePath(uploadImage);
  };
  const onEmailChangeHandler = (emailInput) => {
    setEmail(emailInput);
  };
  const onPasswordChangeHandler = (passwordInput) => {
    setPassword(passwordInput);
  };
  const onPhoneChangeHandler = (phoneInput) => {
    setPhone(phoneInput);
  };
  const onRePasswordChangeHandler = (repasswordInput) => {
    setRepassword(repasswordInput);
  };
  const onRoleChangeHandler = (roleChoice) => {
    setRole(roleChoice);
  };
  const onGenderChangeHandler = (genderChoice) => {
    setGender(genderChoice);
  };
  const onNameChangeHandler = (nameInput) => {
    setName(nameInput);
  };

  const onClickHandler = (event) => {
    event.preventDefault();
    if (repassword === password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          setDoc(doc(collection(db, "users"), auth.currentUser.uid), {
            email,
            role,
            gender,
            name,
            phone,
            points,
            statusUser,
            registerDate: fullDate(),
          });
          uploadFiles(imagePath, auth.currentUser.uid);
        })
        .then((res) => {
          getDoc(
            doc(
              collection(db, "registers"),
              "OQI4zFeoRwa01feiYVItSqt2fSMuT4LFdApcXUJUf8"
            )
          )
            .then((res) => {
              let myNumber = res.data().number;
              setDoc(
                doc(
                  collection(db, "registers"),
                  "OQI4zFeoRwa01feiYVItSqt2fSMuT4LFdApcXUJUf8"
                ),
                { number: myNumber + 1 }
              );
            })
            .catch((error) => {
              let myNumber = 0;
              setDoc(
                doc(
                  collection(db, "registers"),
                  "OQI4zFeoRwa01feiYVItSqt2fSMuT4LFdApcXUJUf8"
                ),
                { number: myNumber + 1 }
              );
            });
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("הסיסמאות לא זהות");
    }
  };
  return (
    <div className="auth-wrapper">
      <div className="register">
        <form>
          <h1 data-testid="Register">Register</h1>
          <input
            className="LoginRegisterIn"
            placeholder="Email הכנס כתובת"
            onChange={(input) => {
              onEmailChangeHandler(input.target.value);
            }}
            type="email"
          />
          <input
            className="LoginRegisterIn"
            placeholder="הכנס סיסמה"
            onChange={(input) => {
              onPasswordChangeHandler(input.target.value);
            }}
            type="password"
          />
          <input
            className="LoginRegisterIn"
            placeholder=" חזור על הסיסמה"
            onChange={(input) => {
              onRePasswordChangeHandler(input.target.value);
            }}
            type="password"
          />
          <select
            onChange={(input) => {
              onRoleChangeHandler(input.target.value);
            }}
            id="UserType"
            type="userType"
          >
            <option value="Traveler">מטייל</option>
            <option value="Guide">מדריך</option>
          </select>

          {role === "Guide" && (
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              accept=".jpg, .jpeg"
              className="LoginRegisterIn"
              placeholder="תעודת מדריך"
              onChange={(input) => {
                onUploadImage(input.target.files[0]);
                disableGuide();
              }}
            />
          )}

          <input
            className="LoginRegisterIn"
            placeholder=" שם מלא"
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
            הרשמה
          </button>
          <p className="loginnow">
            <button onClick={props.onSwitchPages}>התחבר עכשיו</button>
            ?כבר רשום
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
