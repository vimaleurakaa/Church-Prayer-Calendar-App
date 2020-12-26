function eventsFragment() {
  // Lifecycle hook (`init`)
  document.getElementById("event").onInit = function () {
    dateFragment();
    this.onShow = function () {};
    this.onHide = function () {};
    this.onDestroy = function () {};
  };
}

function dateFragment() {
  const urlPath = location.href.substring(location.href.indexOf("?") + 1);
  let database = JSON.parse(localStorage.getItem("database"));

  if (database != null) {
    const prayerdata = database[urlPath]["prayerData"];
    const prayer_root = document.getElementById("rootEvent");
    prayerData(prayer_root, prayerdata);
  } else {
    root.innerHTML += `<h1>Please make sure your internet connection is Stable!</h1>`;
    console.log("No Database found!!!");
  }
}

//Map Prayer Data
function prayerData(element, data) {
  Object.values(data).map((i) => {
    element.innerHTML += `<h1>${i}</h1>`;
  });
}

function getFirebaseData() {
  return firebase
    .database()
    .ref("data")
    .once("value")
    .then(function (snapshot) {
      let value = snapshot.val();
      localStorage.setItem("database", JSON.stringify(value));
    });
}
