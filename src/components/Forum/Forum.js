import React, { useState, useEffect } from "react";
import ForumTitles from "./ForumTitles";
import Topics from "./Topics";
import { auth, db } from "../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const Forum = (props) => {
  const [topicList, setTopicList] = useState([]);

  useEffect(() => {
    const getTopics = async () => {
      const data = await getDocs(collection(db, "topics"));
      setTopicList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTopics();
  }, []);

  const onAddTopicHandler = (topic) => {
    async function asyncCall() {
      const newTopicRef = await addDoc(collection(db, "topics"), topic);
      setTopicList([...topicList, { ...topic, id: newTopicRef.id }]);
    }
    asyncCall();
  };
  const onAddPostHandler = (id, date) => {
    async function asyncCall() {
      const topicRef = doc(db, "topics", id);
      await updateDoc(topicRef, {
        lastDate: date,
      });
    }
    setTopicList(
      topicList.map((topic) =>
        topic.id === id ? { ...topic, lastDate: date } : topic
      )
    );
    asyncCall();
  };

  return (
    <div>
      <header>
        <ForumTitles topicList={topicList} onAddTopic={onAddTopicHandler} />
      </header>
      <main>
        <Topics onAddPost={onAddPostHandler} topicList={topicList} />
      </main>
    </div>
  );
};

export default Forum;
