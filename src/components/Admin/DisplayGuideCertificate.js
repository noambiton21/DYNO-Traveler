import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import CloseIcon from "@mui/icons-material/Close";

function DisplayGuideCertificate(props) {
  const [guideCertificate, setGuideCertificate] = useState("");

  useEffect(() => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `/auth/${props.user.id}.jpg`))
      .then((url) => {
        setGuideCertificate(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (props.clickDisplay) {
    return (
      <div>
        <img
          className="guide-certificate"
          src={guideCertificate}
          alt="mainImage"
        />
        <CloseIcon onClick={props.onClick} />
      </div>
    );
  }

  return <></>;
}

export default DisplayGuideCertificate;
