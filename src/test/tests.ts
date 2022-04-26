export class Tests {
  private static instance;

  public success: number = 0;
  public errors: number = 0;

  constructor() {}

  public static get Instance() {
    if (!Tests.instance) {
      Tests.instance = new Tests();
    }
    return Tests.instance;
  }

  private checkIfLiked(trip, tripsUserLiked) {
    let checked = false;
    tripsUserLiked.forEach((uid) => {
      if (uid.tripUid === trip.id) checked = true;
    });
    return checked;
  }

  private isAdmin(user) {
    return user.permission === "admin";
  }

  private findMaxLike(arr, maxLike) {
    let max = 0;
    arr.forEach((item) => {
      max = item.like > max ? item.like : max;
    });
    return max === maxLike;
  }
  private getDistance(x1, y1, x2, y2, distance) {
    let R = 6371; // Radius of the earth in km
    let dLat = (y2 - y1) * (Math.PI / 180);
    let dLon = (x2 - x1) * (Math.PI / 180);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(y1 * (Math.PI / 180)) *
        Math.cos(y2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d === distance;
  }

  private findMaxPoints(arr, maxLike) {
    let max = 0;
    arr.forEach((item) => {
      max = item.points > max ? item.points : max;
    });
    return max === maxLike;
  }

  private todayDate(date) {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    let now = dd + "/" + mm + "/" + yyyy;
    return now === date;
  }

  private userLoggedIn(islogin) {
    return islogin;
  }

  private userRegistered(users, checkUser) {
    let checkIfRegistered = false;
    users.forEach((user) => {
      if (user.uid === checkUser.uid) checkIfRegistered = true;
    });
    return checkIfRegistered;
  }

  private checkRole(user, role) {
    if (user.role === role) return true;
    else return false;
  }

  private checkUserUid(user, uid) {
    if (user.uid === uid) return true;
    else return false;
  }
}
