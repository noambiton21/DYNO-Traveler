import React, { useState, useEffect } from "react";
import "./SlideShow.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Thumbnail = ({ arr, image, index }) => {
  return (
    <div className="tumbnail">
      {arr.map((imgsrc, i) => (
        <img
          key={i}
          height="50"
          src={imgsrc}
          onClick={() => image(i)}
          className={index === i ? "active" : ""}
        />
      ))}
    </div>
  );
};

const SlideShow = ({ imgs }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, []);

  const next = () => {
    if (index === imgs.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };
  const prev = () => {
    if (index === 0) {
      setIndex(imgs.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  return (
    <div className="slideshow">
      <img className="mainImg" src={imgs[index]} />
      <div className="actions">
        <ArrowForwardIcon onClick={next} />
        <ArrowBackIcon onClick={prev} />
      </div>
      <Thumbnail arr={imgs} image={setIndex} index={index} />
    </div>
  );
};

export default SlideShow;
