import React, { useState, useEffect } from "react";
import ContentBox from "./ContentBox";
import Search from "./Search";
import bg from "../assets/homePage.jpg";
import { auth, db } from "../firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import About from "./About";
import DisplayImage from "./DisplayImage.js";

const HomePageTraveler = (props) => {
  const [tripList, setTripList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [userLocation, setUserLocation] = useState({});
  const [tripsUserLiked, setTripsUserLiked] = useState([]);
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

    navigator.geolocation.getCurrentPosition((position) => {
      const positionTraveler = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
      setUserLocation(positionTraveler);
    });
    const getUsers = async () => {
      const data = await getDocs(collection(db, "users"));
      setUsersList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  useEffect(() => {
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

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const findMaxLike = (arr) => {
    let max = 0;
    arr.forEach((item) => {
      max = item.likes > max ? item.likes : max;
    });
    return max;
  };
  const findMaxPoints = (arr) => {
    let max = 0;
    arr.forEach((item) => {
      max = item.points > max ? item.points : max;
    });
    return max;
  };
  const buildDisplayUser = (role) => {
    const topUser = usersList.filter((user) => {
      return user.role === role;
    });

    const maxPoints = findMaxPoints(topUser);

    const maxPointsUser = topUser.filter((user) => user.points === maxPoints);

    return maxPointsUser.map((user, index) => {
      if (Number(index) !== 0) return;

      return (
        <div key={index}>
          <h3>{user.name}</h3>
          {role === "Guide" && (
            <div>
              <div>{" התקשר לתאם טיול: "}</div> {user.phone}
            </div>
          )}
          <div>{user.email}</div>
          <h3>עם {user.points} נקודות</h3>
        </div>
      );
    });
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
              className="trip-title-link"
            >
              {trip.tripName}
            </Link>
          </h2>
          {trip.tellUsContext}
        </div>
      );
    });
  };

  const buildDisplayClose = () => {
    const newTripList = tripList.filter((trip) => {
      let distance = getDistanceFromLatLonInKm(
        trip.tripLocation.lat,
        trip.tripLocation.lng,
        userLocation.lat,
        userLocation.lon
      );
      return distance < 50;
    });
    return newTripList.map((trip, index) => {
      if (Number(index) > 2) return;

      return (
        <div key={index}>
          <DisplayImage tripName={trip.tripName} />
          <h2>
            <Link
              to={{
                pathname: `/trips/${trip.id}`,
              }}
              className="trip-title-link"
            >
              {trip.tripName}
            </Link>
          </h2>
          {trip.tellUsContext}
        </div>
      );
    });
  };

  const buildDisplayFavorites = () => {
    const newTripList = tripList.filter((trip) => {
      let check = checkIfLiked(trip);
      return check === true;
    });

    return newTripList.map((trip, index) => {
      if (Number(index) > 2) return;

      return (
        <div key={index}>
          <DisplayImage tripName={trip.tripName} />
          <h2>
            <Link
              to={{
                pathname: `/trips/${trip.id}`,
              }}
              className="trip-title-link"
            >
              {trip.tripName}
            </Link>
          </h2>
          {trip.tellUsContext}
        </div>
      );
    });
  };
  const checkIfLiked = (trip) => {
    let checked = false;
    tripsUserLiked.forEach((uid) => {
      if (uid.tripUid === trip.id) checked = true;
    });
    return checked;
  };

  const displayTopTraveler = buildDisplayUser("Traveler");
  const displayTopGuide = buildDisplayUser("Guide");
  const displayTrips = buildDisplay("trips");
  const displayAttractions = buildDisplay("attractions");
  const displayMuseums = buildDisplay("museums");
  const displayCloseToYou = buildDisplayClose();
  const displayYourFavorites = buildDisplayFavorites();

  return (
    <div>
      <div className="main-homePageTraveler">
        <div className="img-center">
          <img className="homepage-image" src={bg} alt="noImage" />
          <div className="user-details">
            <div>שלום {userName}</div>
            <div>הניקוד שלך: {userPoints}</div>
          </div>
        </div>
        <div className="searchNav">
          <ul className="search__links">
            <li>
              <Link
                to={{
                  pathname: `/trips`,
                  state: {
                    category: "trips",
                  },
                }}
                className="quickSearch"
              >
                מסלולים
              </Link>
            </li>
            <li>
              <Link
                to={{
                  pathname: `/trips`,
                  state: {
                    category: "attractions",
                  },
                }}
                className="quickSearch"
              >
                אטרקציות
              </Link>
            </li>
            <li>
              <Link
                to={{
                  pathname: `/trips`,
                  state: {
                    category: "museums",
                  },
                }}
                className="quickSearch"
              >
                מוזאונים
              </Link>
            </li>
          </ul>
        </div>
        <div className="searchBar">
          {" "}
          <Search placeholder="חפש מסלול" data={tripList} />
        </div>
        <h2 className="title-recommended">הדירוגים המובילים</h2>
        <div className="display-recommended">
          <div className="display-box-recommended">{displayTrips}</div>
          <div className="display-box-recommended">{displayAttractions}</div>
          <div className="display-box-recommended">{displayMuseums}</div>
        </div>
        <h2 className="title-recommended">המשתמשים המובילים</h2>
        <div className="display-users-recommended">
          <div className="display-box-users">
            <h3>בקטגורית המטיילים:</h3>
            {displayTopTraveler}
          </div>

          <div className="display-box-users">
            <h3>בקטגורית המדריכים:</h3>
            {displayTopGuide}
          </div>
        </div>
        <h2 className="title-recommended">מקומות שסימנת להם לייק</h2>
        <div className="display-yourFavorits">
          <div className="display-box-yourFavorits">{displayYourFavorites}</div>
        </div>
        <h2 className="title-recommended">נמצאים בקרבתך</h2>
        <div className="display-recommended-location">
          <div className="display-box-recommended-location">
            {displayCloseToYou}
          </div>
        </div>
      </div>
      <div>
        <About />
      </div>
    </div>
  );
};

export default HomePageTraveler;
