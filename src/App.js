import { useState, useEffect, useRef } from "react";
import "./App.css";
import { db, auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import Login from "./components/Login";
import Register from "./components/Register";
import { signOut } from "firebase/auth";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [isLoggedIn, setIsLoggedIn] = useState("NotLoaded");
  const onSwitchPages = () => {
    setIsRegistered(!isRegistered);
  };

  useEffect(() => {
    // setTimeout(() => {
    onAuthStateChanged(auth, (user) => {
      !user ? setIsLoggedIn(false) : setIsLoggedIn(true);
    });
    // }, 1000);
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);
  if (isLoggedIn === "NotLoaded") {
    return <div>Loading...</div>;
  }
  if (!isLoggedIn) {
    if (isRegistered) {
      return (
        <div className="App">
          <Register onSwitchPages={onSwitchPages} />
        </div>
      );
    }
    return (
      <div className="App">
        <Login onSwitchPages={onSwitchPages} />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <HomePage path="/home" auth={auth} signOut={signOut} />
    </BrowserRouter>
  );
}

export default App;
