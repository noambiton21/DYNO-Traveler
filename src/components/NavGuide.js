import React, { useState } from "react";
import { db, auth } from "../firebase-config";
import { getAuth, signOut } from "firebase/auth";
import EditUser from "./EditUser";
import { Link } from "react-router-dom";
import "./NavGuide.css";

const NavGuide = () => {
  const [updateUser, setUpdateUser] = useState(false);

  const toHome = () => {
    setUpdateUser(false);
  };
  return (
    <header className="topnavGuide">
      <nav className="nav">
        <ul className="nav__links_Guide">
          <Link to="/">
            <img
              src="https://www.pinclipart.com/picdir/middle/132-1322313_just-a-pack-travelling-logo-png-clipart.png"
              alt="Bankist logo"
              className="nav__logo_Guide"
              id="logo"
            />
          </Link>

          <li>
            <Link to="/" className="btnnav">
              בית
            </Link>
          </li>
          <li>
            <Link to="/editUser" className="btnnav">
              עריכת פרופיל
            </Link>
          </li>
          <li>
            <Link to="/forums" className="btnnav">
              פורומים
            </Link>
          </li>
          <li>
            <button
              className="btnnav"
              // className="btnnav"
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
              התנתק
            </button>
          </li>
        </ul>
      </nav>
      <div className="wrapper">
        {!updateUser ? <></> : <EditUser onSave={toHome} />}
      </div>
    </header>
  );
};

export default NavGuide;
