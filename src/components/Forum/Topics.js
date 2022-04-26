import React from "react";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import "./Topics.css";
import { Link } from "react-router-dom";
import About from "../About";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import Swal from "sweetalert2";

const Topics = (props) => {
  // const [topicList, setTopicList] = useState([]);

  const [usersList, setUsersList] = useState([]);
  const [currentUserRole, setCurrentUserRole] = useState("");

  useEffect(async () => {
    let ref = doc(db, "users", auth.currentUser.uid);
    if (!ref) return;
    const docSnap = await getDoc(ref);
    if (!docSnap.exists()) return;
    const userInfo = docSnap.data();
    setCurrentUserRole(userInfo.role);
  }, []);

  const updatePostStatus = (status, postUid) => {
    updateDoc(doc(collection(db, "topics"), postUid), {
      lockStatus: status,
    })
      .catch((error) => {
        alert(error);
      })
      .then(() => {
        let message = "";
        if (status === "close") message = "סגור";
        else message = "פתוח";
        Swal.fire({
          icon: "success",
          text: "הנושא עכשיו: " + message,
        });
      });
  };

  if (currentUserRole === "Admin") {
    return (
      <div>
        <div className="box">
          {props.topicList.map((post) => {
            return (
              <div key={post.id} className="none">
                <div className="postHeader">
                  <div className="row">
                    <h4 className="topicList-category">
                      <div>
                        {post.lockStatus === "open" ? (
                          <LockOpenIcon
                            onClick={() => {
                              updatePostStatus("close", post.id);
                            }}
                            // onClick={updatePostStatus("close", post.id)}
                          />
                        ) : (
                          <LockIcon
                            onClick={() => {
                              updatePostStatus("open", post.id);
                            }}
                          />
                        )}
                      </div>
                      {post.category}
                    </h4>
                    <Link
                      to={{
                        pathname: `/forums/${post.id}`,
                      }}
                      className="topicList"
                    >
                      {post.title}
                    </Link>
                    <div className="topicList">{post.commentsNum}</div>
                    <div className="topicList">{post.openDate}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="about">
          <About />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="box">
          {props.topicList.map((post) => {
            return (
              <div key={post.id} className="none">
                <div className="postHeader">
                  <div className="row">
                    <h4 className="topicList-category">
                      {post.lockStatus === "open" ? (
                        <LockOpenIcon />
                      ) : (
                        <LockIcon />
                      )}
                      {post.category}
                    </h4>
                    <Link
                      to={{
                        pathname: `/forums/${post.id}`,
                      }}
                      className="topicList"
                    >
                      {post.title}
                    </Link>
                    <div className="topicList">{post.commentsNum}</div>
                    <div className="topicList">{post.openDate}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="about">
          <About />
        </div>
      </div>
    );
  }
};

export default Topics;
