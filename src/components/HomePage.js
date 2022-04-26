import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import { getDoc, doc, getDocFromCache, collection } from "firebase/firestore";
import "./HomePage.css";
import { Route } from "react-router-dom";
import NavTraveler from "./NavTraveler";
import NavGuide from "./NavGuide";
import EditUser from "./EditUser";
import Forum from "./Forum/Forum";
import HomePageTraveler from "./HomePageTraveler";
import TopicDetail from "./Forum/TopicDetail";
import HomePageGuide from "./HomePageGuide";
import AddTrip from "./AddTrip";
import Trip from "./Trips/Trip";
import Trips from "./Trips/Trips";
import AdminHomePage from "./Admin/AdminHomePage";
import DisplayUsers from "./Admin/DisplayUsers";
import MakeAdmin from "./Admin/MakeAdmin";
import ApproveGuide from "./Admin/ApproveGuide";
import Graphs from "./Admin/Graphs";
import Favorites from "./Favorits";
import { getAuth, signOut } from "firebase/auth";

const HomePage = (props) => {
  const [userRole, setUserRole] = useState(null);
  const [status, setStatus] = useState("");
  //   const [userDetails, setUserDetails] = useState('')
  // db.collection('users').doc(id).get()
  //         .then(snapshot => setUserDetails(snapshot.data()))

  useEffect(async () => {
    let ref = doc(db, "users", props.auth.currentUser.uid);
    if (!ref) return;
    const docSnap = await getDoc(ref);
    if (!docSnap.exists()) return;
    const userInfo = docSnap.data();
    setUserRole(userInfo.role);
    setStatus(userInfo.statusUser);
  }, []);

  if (userRole === "Traveler") {
    if (status === "enable") {
      return (
        <div className="homepage">
          <NavTraveler />
          <main>
            <Route path="/" exact component={HomePageTraveler} />
            <Route path="/editUser">
              <EditUser />
            </Route>
            <Route path="/forums" exact component={Forum} />
            <Route path="/forums/:id" component={TopicDetail} />
            <Route path="/trips" exact component={Trips} />
            <Route path="/trips/:id" component={Trip} />
            <Route path="/favorites" component={Favorites} />
          </main>
        </div>
      );
    } else
      return (
        <h1>
          אדמין חסם אותך
          <button
            // class="btnnav"
            onClick={() => {
              signOut(auth)
                .then(() => {
                  // Sign-out successful.
                })
                .catch((error) => {
                  // An error happened.
                });
            }}
          >
            חזרה לתפריט הראשי
          </button>
        </h1>
      );
  } else if (userRole === "Guide") {
    if (status === "enable") {
      return (
        <div className="homepage">
          <NavGuide />
          <main>
            <Route path="/" exact component={HomePageGuide} />
            <Route path="/editUser">
              <EditUser />
            </Route>
            <Route path="/forums" exact component={Forum} />
            <Route path="/forums/:id" component={TopicDetail} />
            <Route path="/AddTrip" component={AddTrip} />
            <Route path="/trips/:id" component={Trip} />
          </main>
        </div>
      );
    } else
      return (
        <h1>
          אנא המתן לאישור אדמין
          <button
            // class="btnnav"
            onClick={() => {
              signOut(auth)
                .then(() => {
                  // Sign-out successful.
                })
                .catch((error) => {
                  // An error happened.
                });
            }}
          >
            חזרה לתפריט הראשי
          </button>
        </h1>
      );
  } else if (userRole === "Admin") {
    return (
      <div>
        <Route path="/" component={AdminHomePage} />;
        <main>
          <Route path="/forums" exact component={Forum} />;
          <Route path="/forums/:id" component={TopicDetail} />
          <Route path="/DisplayUsers" component={DisplayUsers} />;
          <Route path="/MakeAdmin" component={MakeAdmin} />;
          <Route path="/ApproveGuide" component={ApproveGuide} />;
          <Route path="/Graphs" component={Graphs} />;
        </main>
      </div>
    );
  } else {
    return <div>loading page</div>;
  }
};

export default HomePage;
