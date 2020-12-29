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
    const prayer_root = document.getElementById("prayer-data");
    const holiday_root = document.getElementById("holiday-data");
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
  $("#prayer-data p").remove();
  if (data != undefined) {
    Object.values(data).map((i) => {
      element.innerHTML += `
      <ons-list-item class="border-list prayer-list-item" tappable>
        ${i}
      </ons-list-item>`
    });
  }
}

//Map Holiday Data
function holidayData(element, data) {
  $("#holiday-data p").remove();
  if (data != undefined) {
    Object.values(data).map((i) => {
      element.innerHTML += `
      <ons-list-item class="list-item list-border">
       <div class="center list-item__center"> ${i}</div>
    </ons-list-item>`
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
