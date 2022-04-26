import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const DisplayImage = (props) => {
  const [tripImage, setTripImage] = useState("");
  useEffect(() => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `/trips/${props.tripName}.jpg`))
      .then((url) => {
        setTripImage(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <img className="top-recommended-image" src={tripImage} alt="mainImage" />
  );
};

export default DisplayImage;
