// import { TripInfo, TripsUserLiked } from "./constants.ts";
import { Tests } from "./tests.ts";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// build the calling function - arguments and return the result;
export const checkIsTripLiked = () => {
  //   const tripInfo = { id: 4 };
  const tripInfo = { id: 1 };
  const tripsUserLiked = [{ tripUid: 1 }, { tripUid: 2 }, { tripUid: 3 }];
  return Tests.Instance.checkIfLiked(tripInfo, tripsUserLiked);
};

export const checkIfAdmin = () => {
  const user = { permission: "admin" };
  //   const user = { permission: "traveler" };
  return Tests.Instance.isAdmin(user);
};

export const checkIfMaxLiked = () => {
  const trips = [{ like: 1 }, { like: 2 }, { like: 3 }];
  const maxLike = 3;
  //   const maxLike = 2;
  return Tests.Instance.findMaxLike(trips, maxLike);
};
export const checkDistance = () => {
  const x1 = 4;
  const x2 = 2;
  const y1 = 4;
  const y2 = 2;
  const distance = 314.2832550736839;
  //   const distance = 315.2832550736839;
  return Tests.Instance.getDistance(x1, y1, x2, y2, distance);
};

export const checkIfMaxPoints = () => {
  const user = [{ points: 15 }, { points: 2 }, { points: 3 }];
  const maxLike = 15;
  //   const maxLike = 2;
  return Tests.Instance.findMaxPoints(user, maxLike);
};

export const checkIfDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  let now = dd + "/" + mm + "/" + yyyy;
  return Tests.Instance.todayDate(now);
};

export const checkIsLoggedIn = () => {
  let login = true;
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    !user ? (login = false) : (login = true);
  });
  return Tests.Instance.userLoggedIn(login);
};

export const checkIsRegistered = () => {
  let users = [{ uid: 123 }, { uid: 456 }, { uid: 568 }];
  let myUser = { uid: 123 };
  //   let myUser = { uid: 444 };
  return Tests.Instance.userRegistered(users, myUser);
};

export const isCurrectRole = () => {
  let user = { uid: 1125, role: "Admin" };
  let role = "Admin";
  // let role="Traveler"
  return Tests.Instance.checkRole(user, role);
};

export const isCurrectUid = () => {
  let user = { uid: 1125, phone: 55422, name: "Yosi" };
  let Uid = 1125;
  //   let Uid = 542;
  return Tests.Instance.checkUserUid(user, Uid);
};
