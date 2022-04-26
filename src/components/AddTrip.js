import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePageGuide.css";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase-config";
import { auth, db, app } from "../firebase-config";
import MapContainer from "./Map";
import NewMap from "./NewMap";

const AddTrip = (props) => {
  const [category, setCategory] = useState("trips");
  const [tripName, setTripName] = useState("");
  const [tripDetails, setTripDetails] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [likes, setLikes] = useState(Number(0));
  const [guideName, setGuideName] = useState("");
  const [openMap, setOpenMap] = useState(false);
  const [tripLocation, setTripLocation] = useState({});
  const [disable, setDisable] = useState(false);
  const [tellUsContext, setTellUsContext] = useState("");

  const fullDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;

    let date1 = new Date();
    return date1;
  };

  useEffect(() => {
    const getName = async () => {
      const nameRef = doc(db, "users", auth.currentUser.uid);
      const nameSnap = await getDoc(nameRef);
      setGuideName(nameSnap.data().name);
    };
    getName();
  }, []);

  const onChangeTripLocation = (location) => {
    setTripLocation(location);
  };
  const onCategoryChangeHandler = (category) => {
    setCategory(category);
  };
  const onNameChange = (name) => {
    setTripName(name);
  };
  const onContentChange = (details) => {
    setTripDetails(details);
  };

  const onTellUsChange = (details) => {
    setTellUsContext(details);
  };

  const onClickHandler = (event) => {
    event.preventDefault();
    async function asyncCall() {
      await addDoc(collection(db, "trips"), {
        tripName,
        category,
        tripDetails,
        tellUsContext,
        likes,
        guideName,
        guideEmail: auth.currentUser.email,
        guideUid: auth.currentUser.uid,
        postDate: fullDate(),
        tripLocation,
      });
    }
    asyncCall();
    uploadFiles(imagePath, tripName);
  };
  const uploadFiles = (file, tripName) => {
    if (!file) return;
    const storgaeRef = ref(
      storage,
      `/trips/${tripName}.${file.name.split(".")[1]}`
    );
    const uploadTask = uploadBytesResumable(storgaeRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err)
    );
  };
  const onUploadImage = (uploadImage) => {
    setImagePath(uploadImage);
  };

  const onClickMap = (event) => {
    event.preventDefault();
    setOpenMap(!openMap);
  };

  if (openMap) {
    return (
      <NewMap onTripLocation={onChangeTripLocation} onCloseMap={onClickMap} />
    );
  }
  return (
    <div>
      <div className="add-trip">
        <h1 className="add-new-trip">הוסף טיול חדש</h1>

        <select
          className="trip-category"
          onChange={(input) => {
            onCategoryChangeHandler(input.target.value);
          }}
          id="UserType"
          type="userType"
        >
          <option value="trips">מסלולים</option>
          <option value="attractions">אטרקציות</option>
          <option value="museums">מוזאונים</option>
        </select>
        <button className="openMap-btn" onClick={onClickMap}>
          פתח מפה לבחירת המיקום של הטיול
        </button>
        <div>
          <input
            className="trip-title"
            type="text"
            placeholder="שם הטיול"
            onChange={(input) => {
              onNameChange(input.target.value);
            }}
          />
        </div>
        <div className="textArea-box-tellUs">
          <textarea
            className="textArea-trip-tellUs"
            rows="4"
            cols="50"
            type="text"
            placeholder="ספר לנו בקצרה על הטיול"
            onChange={(input) => {
              onTellUsChange(input.target.value);
            }}
          />
        </div>
        <div className="textArea-box">
          <textarea
            className="textArea-trip"
            type="text"
            placeholder="הוסף את המלל פה"
            onChange={(input) => {
              onContentChange(input.target.value);
            }}
          />
        </div>
        <div className="add-photo">
          <input
            type="file"
            id="trip_pic"
            name="trip_pic"
            accept=".jpg, .jpeg, .png"
            className="add-file"
            placeholder="הכנס תמונה מהטיול"
            onChange={(input) => {
              onUploadImage(input.target.files[0]);
            }}
          />
        </div>
        <div>
          <input
            className="saveTrip-btn"
            type="submit"
            value="שמור"
            disabled={disable}
            onClick={(e) => {
              onClickHandler(e);
              setDisable(true);
            }}
          />
          <Link to="/" className="topicList">
            סגור
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddTrip;
