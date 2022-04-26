import React from "react";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./Trips.css";
import About from "../About";

const Trips = (props) => {
  const [tripsList, setTripsList] = useState([]);

  useEffect(() => {
    const getTrips = async () => {
      const data = await getDocs(collection(db, "trips"));
      setTripsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTrips();
  }, []);

  return (
    <div className="con">
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
        {tripsList
          .filter((trip) => {
            return trip.category === props.location.state.category;
          })
          .map((trip) => (
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
      </div>
      <div></div>
      <About className="bottom" />
    </div>
  );
};

export default Trips;
