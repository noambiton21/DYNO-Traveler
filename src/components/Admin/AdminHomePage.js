import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./AdminHomePage.css";
import { getAuth, deleteUser, signOut } from "firebase/auth";
import { db, auth } from "../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  checkIsTripLiked,
  checkIfAdmin,
  checkIfMaxLiked,
  checkDistance,
  checkIfMaxPoints,
  checkIfDate,
  checkIsLoggedIn,
  checkIsRegistered,
  isCurrectRole,
  isCurrectUid,
} from "../../test/unitTests.ts";
import { Tests } from "../../test/tests.ts";

// import { checkSum } from "../../test/unitTests.ts";

const navigation = [
  {
    title: "Users",
    href: "/DisplayUsers",
    icon: "bi bi-person-lines-fill",
  },
  {
    title: "Admin-Users",
    href: "/MakeAdmin",
    icon: "bi bi-person-plus-fill",
  },
  {
    title: "Guide",
    href: "/ApproveGuide",
    icon: "bi bi-person-check-fill",
  },
  {
    title: "Graphs and data",
    href: "/Graphs",
    icon: "bi bi-graph-up",
  },
  {
    title: "Forums",
    href: "/Forums",
    icon: "bi bi-list-columns-reverse",
  },
];

const AdminHomePage = (props) => {
  const printTestsResult = () => {
    console.log(
      `%c test success: ${Tests.instance.success}`,
      "background:green;color:white"
    );
    console.log(
      `%c test failed: ${Tests.instance.errors}`,
      "background:red;color:black"
    );
    Tests.instance.success = 0;
    Tests.instance.errors = 0;
  };

  const runTests = () => {
    if (checkIsTripLiked()) Tests.Instance.success++;
    else Tests.Instance.errors++;

    if (checkIfAdmin()) Tests.Instance.success++;
    else Tests.Instance.errors++;

    if (checkIfMaxLiked()) Tests.Instance.success++;
    else Tests.Instance.errors++;

    if (checkDistance()) Tests.Instance.success++;
    else Tests.Instance.errors++;

    if (checkIfMaxPoints()) Tests.Instance.success++;
    else Tests.Instance.errors++;

    if (checkIfDate()) Tests.Instance.success++;
    else Tests.Instance.errors++;

    if (checkIsLoggedIn()) Tests.Instance.success++;
    else Tests.Instance.errors++;

    if (checkIsRegistered()) Tests.Instance.success++;
    else Tests.Instance.errors++;

    if (isCurrectRole()) Tests.Instance.success++;
    else Tests.Instance.errors++;

    if (isCurrectUid()) Tests.Instance.success++;
    else Tests.Instance.errors++;

    printTestsResult();
  };
  return (
    <div className="pageWrapper">
      <div className="sidebarArea" id="sidebarArea">
        <div className="pt-4 mt-2">
          <div className="adminside">
            {navigation.map((navi, index) => (
              <div key={index} className="sidenav-bg">
                <Link className="btn-sidenav" to={navi.href}>
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </Link>
              </div>
            ))}
            <div className="sidenav-bg">
              <button
                className="btn-logout"
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
                logout
              </button>
            </div>
          </div>
          <button
            className="btn-unitTests"
            onClick={() => {
              runTests();
            }}
          >
            Unit Tests
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
