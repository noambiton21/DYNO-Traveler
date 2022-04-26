import React from "react";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase-config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./Trips/Trips.css";
import About from "./About";

const Favorits = (props) => {
  const [tripsList, setTripsList] = useState([]);
  const [tripsUserLiked, setTripsUserLiked] = useState([]);

  useEffect(() => {
    const getTrips = async () => {
      const data = await getDocs(collection(db, "trips"));
      setTripsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTrips();
    const fetchLikes = async () => {
      let fetchedLikes = [];
      const querySnapshot = await getDocs(
        collection(doc(db, "users", auth.currentUser.uid), "likedTripList")
      );
      querySnapshot.forEach((doc) => {
        fetchedLikes.push({ ...doc.data(), key: doc.id });
      });
      setTripsUserLiked(fetchedLikes);
    };
    fetchLikes();
  }, []);

  const buildDisplayFavorites = () => {
    const newTripList = tripsList.filter((trip) => {
      let check = checkIfLiked(trip);
      return check === true;
    });

    return newTripList;
  };
  const checkIfLiked = (trip) => {
    let checked = false;
    tripsUserLiked.forEach((uid) => {
      if (uid.tripUid === trip.id) checked = true;
    });
    return checked;
  };

  return (
    <div className="box-trips">
      <div className="subtrips-row">
        <div className="subtrips-column">
          <h3>קטגוריה</h3>
        </div>
        <div className="subtrips-column">
          <h3>שם הטיול</h3>
        </div>
        <div className="subtrips-column">
          <h3>כמות ליקים</h3>
        </div>
        <div className="subtrips-column">
          <h3>שם המדריך</h3>
        </div>
      </div>
      {buildDisplayFavorites().map((trip) => (
        <div key={trip.id} className="trip-row">
          <div className="trips-category">{trip.category}</div>

          <Link
            to={{
              pathname: `/trips/${trip.id}`,
            }}
            className="trip-name"
          >
            {trip.tripName}
          </Link>

          <div className="trip-likes">{trip.likes}</div>
          <div className="trip-likes">{trip.guideName}</div>
        </div>
      ))}
      <div>
        <About />
      </div>
    </div>
  );
};

export default Favorits;
