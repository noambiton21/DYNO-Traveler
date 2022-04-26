import React, { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { db, auth } from "../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import DisplayGuideCertificate from "./DisplayGuideCertificate";
import "./GuideList.css";

function GuideList(props) {
  const [guideCertificate, setGuideCertificate] = useState("");
  const [clickDisplay, setClickDisplay] = useState(false);

  async function getGuideCertificate() {
    const storage = getStorage();
    getDownloadURL(ref(storage, `/auth/${props.user.id}.jpg`))
      .then((url) => {
        setGuideCertificate(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const onClickDisplay = (e) => {
    e.preventDefault();
    setClickDisplay(!clickDisplay);
  };

  async function approve(e) {
    e.preventDefault();
    const statusRef = doc(db, "users", props.user.id);
    await updateDoc(statusRef, {
      statusUser: "enable",
    });
    alert("המדריך אושר בהצלחה");
  }

  async function denied(e) {
    e.preventDefault();
    const statusRef = doc(db, "users", props.user.id);
    await updateDoc(statusRef, {
      statusUser: "disable",
    });
    alert("החלטת לא לאשר את המדריך");
  }

  return (
    <div>
      <div className="addguide-row">
        <div className="guide-designrow">{props.user.name}</div>
        <div className="guide-designrow">{props.user.email}</div>
        <div className="guide-designrow">{props.user.phone}</div>

        <button className="guide-designrow" onClick={onClickDisplay}>
          צפה
        </button>
        <button
          className="approve-guide-designrow-btn"
          onClick={(e) => {
            approve(e);
          }}
        >
          אשר
        </button>
        <button
          className="denied-guide-designrow-btn"
          onClick={(e) => {
            denied(e);
          }}
        >
          דחה
        </button>
      </div>
      {clickDisplay ? (
        <DisplayGuideCertificate
          onClick={onClickDisplay}
          clickDisplay={clickDisplay}
          user={props.user}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default GuideList;
