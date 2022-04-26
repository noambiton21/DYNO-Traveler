import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePageGuide.css";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db, app } from "../firebase-config";
import About from "./About.js";
import Search from "./Search";
import DisplayImage from "./DisplayImage.js";
import bg from "../assets/homePage.jpg";

const HomePageGuide = (props) => {
  const [topTrip, setTopTrip] = useState("");
  const [topAttrection, setTopAttrection] = useState("");
  const [topMuseum, setTopMuseum] = useState("");
  const [tripList, setTripList] = useState([]);
  const [tripImage, setTripImage] = useState("");
  const [tripShareImages, setTripShareImages] = useState(null);
  const [userPoints, setUserPoints] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(async () => {
    let ref = doc(db, "users", auth.currentUser.uid);
    if (!ref) return;
    const docSnap = await getDoc(ref);
    if (!docSnap.exists()) return;
    const userInfo = docSnap.data();
    setUserPoints(userInfo.points);
    setUserName(userInfo.name);
  }, []);

  useEffect(() => {
    const getTrips = async () => {
      const data = await getDocs(collection(db, "trips"));
      setTripList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTrips();
  }, []);

  const findMaxLike = (arr) => {
    let max = 0;
    arr.forEach((item) => {
      max = item.likes > max ? item.likes : max;
    });
    return max;
  };

  const buildDisplay = (category) => {
    const topRecommandedTrip = tripList.filter((trip) => {
      return trip.category === category;
    });

    const maxLikes = findMaxLike(topRecommandedTrip);

    const maxLikesTrips = topRecommandedTrip.filter(
      (trip) => trip.likes === maxLikes
    );

    return maxLikesTrips.map((trip, index) => {
      if (Number(index) !== 0) return;

      return (
        <div key={index}>
          <DisplayImage tripName={trip.tripName} />
          <h2>
            <Link
              to={{
                pathname: `/trips/${trip.id}`,
              }}
              className="trip-title-guide"
            >
              {trip.tripName}
            </Link>
          </h2>
          {trip.tellUsContext}
        </div>
      );
    });
  };

  const displayTrips = buildDisplay("trips");
  const displayAttractions = buildDisplay("attractions");
  const displayMuseums = buildDisplay("museums");

  return (
    <div>
      <div className="img-center">
        <img className="homepage-image" src={bg} alt="noImage" />
        <div className="user-details">
          <div>שלום {userName}</div>
          <div>הניקוד שלך: {userPoints}</div>
        </div>
      </div>
      <div>
        <Link to="/AddTrip" className="add-trip-btn">
          הוסף טיול חדש
        </Link>

        <Search placeholder="חפש טיול" data={tripList} />
      </div>
      <div className="top-recommended">
        <div className="top-recommended-trips">
          <h2>המסלול האהוב</h2>
          {displayTrips}
        </div>

        <div className="top-recommended-attrection">
          <h2>האטרקציה האהובה</h2>
          {displayAttractions}
        </div>
        <div className="top-recommended-museums">
          <h2>המוזאון האהוב</h2>
          {displayMuseums}
        </div>
      </div>
      <div>
        <About />
      </div>
    </div>
  );
};

export default HomePageGuide;
