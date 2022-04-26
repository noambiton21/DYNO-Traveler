import React from "react";
import "./Trip.css";
import { useState, useEffect } from "react";
import { auth, db, storage } from "../../firebase-config";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import IosShareIcon from "@mui/icons-material/IosShare";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import SlideShow from "./SlideShow";
import About from "../About";
import Swal from "sweetalert2";

const Trip = ({ match }) => {
  const [tripTitle, setTripTitle] = useState("");
  const [tripDetail, setTripDetails] = useState("");
  const [tripLikes, setTripLikes] = useState(0);
  const [likesList, setLikesList] = useState([]);
  const [tripImage, setTripImage] = useState("");
  const [tripShareImages, setTripShareImages] = useState([]);
  const [pressShare, setPressShare] = useState(false);
  const [loadded, setLoadded] = useState(true);
  const [likePressed, setLikePressed] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const [listImageNames, setListImageNames] = useState([]);
  const [guideUid, setGuideUid] = useState("");
  const [guidePhone, setGuidePhone] = useState("");
  const [guideName, setGuideName] = useState("");

  useEffect(async () => {
    let refer = doc(db, "trips", match.params.id);
    if (!refer) return;
    const docSnap = await getDoc(refer);
    if (!docSnap.exists()) return;
    const tripInfo = docSnap.data();

    setTripDetails(tripInfo.tripDetails);
    setTripTitle(tripInfo.tripName);
    setTripLikes(tripInfo.likes);
    setGuideUid(tripInfo.guideUid);

    const storage = getStorage();
    getDownloadURL(ref(storage, `/trips/${tripInfo.tripName}.jpg`))
      .then((url) => {
        setTripImage(url);
      })
      .catch((error) => {
        console.log(error);
      });

    const listRef = ref(storage, `/trips/${tripInfo.tripName}`);

    let listPhotos = [];
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          listPhotos.push(itemRef.fullPath);
          setListImageNames(listPhotos);
          getDownloadURL(ref(storage, `/${itemRef.fullPath}`))
            .then((url) => {
              let urls = tripShareImages;
              if (!urls.includes(url)) {
                urls.push(url);
              }
              setTripShareImages(urls);
            })
            .catch((error) => {
              console.log(error);
            });
          setTripShareImages([...tripShareImages, itemRef.fullPath]);
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const userRef = doc(db, "users", guideUid);
      const userSnap = await getDoc(userRef);
      setGuidePhone(userSnap.data().phone);
      setGuideName(userSnap.data().name);
    };
    getUser();
  }, [guideUid]);

  useEffect(() => {
    const fetchLikes = async () => {
      let fetchedLikes = [];
      const querySnapshot = await getDocs(
        collection(doc(db, "trips", match.params.id), "usersLikeList")
      );
      querySnapshot.forEach((doc) => {
        fetchedLikes.push({ ...doc.data(), key: doc.id });
      });
      setLikesList(fetchedLikes);
    };
    fetchLikes();
  }, []);

  useEffect(() => {
    likesList.forEach((doc) => {
      if (doc.userUid === auth.currentUser.uid) {
        setLikePressed(true);
      }
    });
  }, [likesList]);
  const onClickSaveImage = (event) => {
    event.preventDefault();
    let exists = false;

    console.log(listImageNames);
    // if (item.includes(auth.currentUser.uid)) exists = true;
    listImageNames.forEach((item) => {
      if (item.includes(auth.currentUser.uid)) exists = true;
    });
    if (exists) {
      Swal.fire("אתה יכול להעלות רק תמונה אחת");
      // alert("אתה יכול להעלות רק תמונה אחת");
      setPressShare(false);
      return;
    } else {
      setLoadded(false);
      uploadFiles(imagePath, tripTitle);
      setPressShare(false);
    }
  };
  const uploadFiles = (file, tripName) => {
    if (!file) return;
    const storgaeRef = ref(
      storage,
      `/trips/${tripName}/${auth.currentUser.uid}.${file.name.split(".")[1]}`
    );

    const uploadTask = uploadBytesResumable(storgaeRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (
          Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          ) === 100
        ) {
          setLoadded(true);
        }
      },
      (err) => console.log(err)
    );
    uploadTask.then(() => {
      getDownloadURL(ref(storage, `/${uploadTask._ref.fullPath}`))
        .then((url) => {
          setTripShareImages([...tripShareImages, url]);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  const onUploadImage = (uploadImage) => {
    setImagePath(uploadImage);
  };

  const onClickShare = (e) => {
    e.preventDefault();
    setPressShare(!pressShare);
  };
  const onClickLike = (e) => {
    e.preventDefault();
    let flag = false;
    likesList.forEach((doc) => {
      if (doc.userUid === auth.currentUser.uid) flag = true;
    });
    if (!flag) {
      setLikesList([
        ...likesList,
        {
          userUid: auth.currentUser.uid,
        },
      ]);
      let number = tripLikes + 1;
      setTripLikes(number);

      async function asyncCall(number) {
        const likesRef = doc(db, "trips", match.params.id);
        await updateDoc(likesRef, {
          likes: number,
        });
        const docRef = collection(
          doc(db, "trips", match.params.id),
          "usersLikeList"
        );
        await addDoc(docRef, {
          userUid: auth.currentUser.uid,
        });
        const newRef = collection(
          doc(db, "users", auth.currentUser.uid),
          "likedTripList"
        );
        await addDoc(newRef, {
          tripUid: match.params.id,
        });
      }
      asyncCall(number);
      setLikePressed(true);
    } else {
      Swal.fire("כבר סימנת לייק לטיול זה");
    }
  };

  return (
    <div className="main-trip">
      <div className={`${loadded ? "show-trip" : "hide-trip"}`}>
        <img className="main-image" src={tripImage} alt="mainImage" />
        <h2 className="trip-title-show"> {tripTitle} </h2>
        <h3 className="tripDetails">{tripDetail} </h3>
        <div className={`${likePressed ? "likeIconChecked" : "likeIcon"}`}>
          <ThumbUpAltIcon id="likeBtn" onClick={onClickLike} />
        </div>
        {!loadded && (
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        <div className="btn-share-tripimage">
          <IosShareIcon
            className="btn-share"
            type="file"
            id="trip_pic"
            name="trip_pic"
            accept=".jpg, .jpeg, .png"
            onClick={onClickShare}
          />
        </div>
        <div>
          {pressShare === true && (
            <div>
              <input
                type="file"
                id="share-image"
                accept=".jpg, .jpeg, .png"
                className="input-file"
                onChange={(input) => {
                  onUploadImage(input.target.files[0]);
                }}
              />
              <button className="btn-saveShare" onClick={onClickSaveImage}>
                אישור
              </button>
            </div>
          )}
        </div>
        <div>
          <h1>תמונות שמטיילים העלו</h1>
          <SlideShow imgs={tripShareImages} />
        </div>
        <h3>
          צור קשר עם המדריך {guideName} : {guidePhone}
        </h3>
      </div>
      <div>
        <About />
      </div>
    </div>
  );
};

export default Trip;
