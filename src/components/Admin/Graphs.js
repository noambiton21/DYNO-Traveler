import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import "./Graphs.css";
import DisplayGraph from "./DisplayGraph";

const Graphs = () => {
  const [usersList, setUsersList] = useState([]);
  const [travelers, setTravelers] = useState([]);
  const [guides, setGuides] = useState([]);
  const [loadded, setLoadded] = useState(false);
  const [tripsList, setTripsList] = useState([]);
  const [editData, setEditData] = useState([]);
  const [editData2, setEditData2] = useState(0);
  const [registN, setRegist] = useState(0);
  const [loginsN, setLogins] = useState(0);
  const [postList, setPostList] = useState(0);
  const [postListPrev, setPostListPrev] = useState(0);

  let today = new Date();

  useEffect(() => {
    const fetchNumberOfUsers = async () => {
      getDoc(
        doc(
          collection(db, "registers"),
          "OQI4zFeoRwa01feiYVItSqt2fSMuT4LFdApcXUJUf8"
        )
      )
        .then((res) => {
          setRegist(res.data().number);
        })
        .catch((err) => {
          setRegist(0);
        });
    };

    const fetchNumberOfLogins = async () => {
      getDoc(
        doc(
          collection(db, "logins"),
          "OQI4zFeoRwa01feiYVItSqt2fSMuT4LFdApcXUJUf8"
        )
      )
        .then((res) => {
          setLogins(res.data().number);
        })
        .catch((err) => {
          setLogins(0);
        });
    };
    const getUsers = async () => {
      const data = await getDocs(collection(db, "users"));
      setUsersList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getTrips = async () => {
      const data = await getDocs(collection(db, "trips"));
      setTripsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getTopics = async () => {
      const data = await getDocs(collection(db, "topics")).then((result) => {
        setPostList(
          result.docs.filter((item) => {
            let Difference_In_Time =
              today.getTime() -
              new Date(
                item.data().openDate.split("/")[1] +
                  "/" +
                  item.data().openDate.split("/")[0] +
                  "/" +
                  item.data().openDate.split("/")[2]
              ).getTime();
            let Difference_In_Days =
              Math.round(Difference_In_Time / (1000 * 3600 * 24)) - 1;
            return Difference_In_Days <= 7;
          }).length
        );
        setPostListPrev(
          result.docs.filter((item) => {
            let Difference_In_Time =
              today.getTime() -
              new Date(
                item.data().openDate.split("/")[1] +
                  "/" +
                  item.data().openDate.split("/")[0] +
                  "/" +
                  item.data().openDate.split("/")[2]
              ).getTime();
            let Difference_In_Days =
              Math.round(Difference_In_Time / (1000 * 3600 * 24)) - 1;
            return Difference_In_Days <= 14 && Difference_In_Days > 7;
          }).length
        );
      });

      // setTripsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // return getUsers();
    };
    getTopics();
    getTrips();
    getUsers();
    fetchNumberOfUsers();
    fetchNumberOfLogins();

    // fetchNumberOfUsers();
    setLoadded(true);
  }, []);

  useEffect(() => {
    const build = async () => {
      let arrayOfGraphData = usersList
        .filter((user) => user.role === "Guide")
        .map((user) => {
          let Difference_In_Time =
            today.getTime() - user.registerDate.toDate().getTime();
          let Difference_In_Days =
            Math.round(Difference_In_Time / (1000 * 3600 * 24)) + 1;
          let amount = 0;
          tripsList.map((trip) => {
            if (trip.guideUid === user.id) {
              amount += 1;
            }
          });
          return {
            name: user.name,
            Average: amount / Difference_In_Days,
            Trips: amount,
          };
        });
      setEditData(arrayOfGraphData);
    };
    const build2 = () => {
      let data = [
        {
          name: "Accounts",
          registers: registN,
          logins: loginsN,
        },
      ];
      setEditData2(data);
    };

    build();
    build2();
  }, [usersList, tripsList, registN, loginsN]);

  const onAddDataHandler = (newData) => {
    // setEditData((prev) => [...prev, newData]);
  };

  if (!loadded) {
    return <div>loading page</div>;
  }
  // console.log(editData);
  return (
    <div>
      <DisplayGraph
        datakey0="name"
        datakey1="Average"
        datakey2="Trips"
        data={editData}
      >
        <h1>גרף כמות טיולים ליום</h1>
        <p>גרף זה מתאר את כמות הטיולים ליום שמדריך העלה</p>
        <p>כך נוכל להיות בבקרה על המדריכים ועל תרומתם לאתר</p>
      </DisplayGraph>

      <DisplayGraph
        datakey0="name"
        datakey1="registers"
        datakey2="logins"
        data={editData2}
      >
        <h1>גרף כמות כניסות וכמות רשומים</h1>
        <p>גרף זה מתאר את כמות הכניסות למערכת ואת כמות המשתמשים הרשומים</p>
      </DisplayGraph>

      <DisplayGraph
        datakey0="name"
        datakey1="this_week"
        datakey2="last_week"
        data={[
          {
            name: "Posts",
            this_week: postList,
            last_week: postListPrev,
          },
        ]}
      >
        <h1>גרף כמות פוסטים שבועי בפורומים</h1>
        <p>גרף זה מתאר את כמות הפוסטים השבועית ביחס לשבוע הקודם</p>
      </DisplayGraph>
    </div>
  );
};

export default Graphs;
