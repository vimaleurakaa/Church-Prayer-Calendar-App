function eventsFragment() {
  // Lifecycle hook (`init`)
  document.getElementById("event").onInit = function () {
    dateFragment();
    this.onShow = function () {};
    this.onHide = function () {};
    this.onDestroy = function () {};
  };
}

// Main Fragment
function dateFragment() {
  const urlPath = location.href.substring(location.href.indexOf("?") + 1);
  let database = JSON.parse(localStorage.getItem("database"));
  const path = database[urlPath];

  if (database != null) {
    const prayer_root = document.getElementById("rootEvent");
    const holiday_root = document.getElementById("rootHoliday");
    const prayerdata = path["prayerData"];
    const holidaydata = path["holidayData"];

    prayerData(prayer_root, prayerdata);
    holidayData(holiday_root, holidaydata);
  } else {
    prayer_root.innerHTML += `<h1>Please make sure your internet connection is Stable!</h1>`;
  }
}

//Map Prayer Data
function prayerData(element, data) {
  if (data != undefined) {
    Object.values(data).map((i) => {
      element.innerHTML += `<h1>${i}</h1>`;
    });
  }
}

//Map Holiday Data
function holidayData(element, data) {
  if (data != undefined) {
    Object.values(data).map((i) => {
      element.innerHTML += `<h1>${i}</h1>`;
    });
  }
}

//Retrive firebase data & store local
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
