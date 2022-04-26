import React from "react";
import "./TopicDetail.css";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import "./Topics.css";
import { Link, useLocation } from "react-router-dom";
import About from "../About";

const TopicDetail = ({ match }, props) => {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [topicTitle, setTopicTitle] = useState("");
  const [topicMainComment, setTopicMainComment] = useState("");
  const [topicStatus, setTopicStatus] = useState("");
  const [userPoints, setUserPoints] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [commentNum, setCommentNum] = useState(0);

  const fullDate = () => {
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    let fullydate = day + "/" + month + "/" + year;
    return fullydate;
  };

  useEffect(async () => {
    let ref = doc(db, "topics", match.params.id);
    if (!ref) return;
    const docSnap = await getDoc(ref);
    if (!docSnap.exists()) return;
    const topicInfo = docSnap.data();
    setTopicMainComment(topicInfo.mainContent);
    setTopicTitle(topicInfo.title);
    setUserEmail(topicInfo.userEmail);
    setTopicStatus(topicInfo.lockStatus);
    setCommentNum(topicInfo.commentsNum);
  }, []);

  const onPostChange = (newPost) => {
    setPost(newPost);
  };

  const onClickHandler = (event) => {
    event.preventDefault();

    let number = userPoints + 1;
    setUserPoints(number);

    async function updatePoints(number) {
      const pointsRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(pointsRef, {
        points: number,
      });
    }

    let commentN = commentNum + 1;
    setCommentNum(commentN);

    async function updateCommentNum(commentN) {
      const pointsRef = doc(db, "topics", match.params.id);
      await updateDoc(pointsRef, {
        commentsNum: commentN,
      });
    }
    updateCommentNum(commentN);
    updatePoints(number);
    async function asyncCall() {
      const postDate = fullDate();
      const docRef = collection(doc(db, "topics", match.params.id), "posts");
      const addNewPost = await addDoc(docRef, {
        email: auth.currentUser.email,
        post,
        date: postDate,
      });
      setPosts([
        ...posts,
        {
          email: auth.currentUser.email,
          post: post,
          key: addNewPost.id,
          date: postDate,
        },
      ]);
    }
    asyncCall();
  };

  useEffect(() => {
    const fetchPosts = async () => {
      let fetchedPosts = [];
      const querySnapshot = await getDocs(
        collection(doc(db, "topics", match.params.id), "posts")
      );
      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ ...doc.data(), key: doc.id });
      });
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="show-post">
        <h2 className="topic-title"> {topicTitle} </h2>
        <h3 className="mainComment">{topicMainComment} </h3>
        <h3 className="email-user">{userEmail}</h3>
        {posts.map((postSnapShot) => {
          return (
            <div key={postSnapShot.key} className="show-post">
              <div className="mainComment">{postSnapShot.post}</div>
              <div className="emails">{postSnapShot.email}</div>
            </div>
          );
        })}
        <div>
          <div>
            {topicStatus === "open" && (
              <div>
                <div className="inputText">
                  <textarea
                    className="textAreainput"
                    rows="4"
                    cols="50"
                    type="text"
                    value={post}
                    placeholder="הכנס תגובה פה"
                    onChange={(input) => {
                      onPostChange(input.target.value);
                    }}
                  />
                </div>
                <input
                  className="save"
                  type="submit"
                  value="שמור"
                  onClick={(e) => {
                    onClickHandler(e);
                  }}
                />
              </div>
            )}
            {topicStatus === "close" && (
              <h1>הנושא נעול, אינך יכול להגיב בנושא זה</h1>
            )}
          </div>
        </div>
      </div>

      <About />
    </div>
  );
};

export default TopicDetail;
