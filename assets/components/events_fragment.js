const holidayRecord = `<p style="padding: 0 10px; text-align: center;">No holiday record found for the selected date.</p>`;
const prayerRecord = `<p style="padding: 0 10px; text-align: center;">Data not available please check back later.</h1>`;
const nertworkError = `<p style="padding: 0 10px; text-align: center;">Please make sure your internet connection is Stable!</h1>`;

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
  const prayer_root = document.getElementById("prayer-data");
  const holiday_root = document.getElementById("holiday-data");

  if (database != null) {
    if (path !== undefined) {
      document.getElementById("selectedDate").innerHTML = urlPath;

      if (path.hasOwnProperty("holidayData")) {
        const holidaydata = path["holidayData"];
        holidayData(holiday_root, holidaydata);
      } else {
        holiday_root.innerHTML = holidayRecord;
      }
      const prayerdata = path["prayerData"];
      prayerData(prayer_root, prayerdata);
    } else {
      prayer_root.innerHTML += prayerRecord;
    }
  } else {
    prayer_root.innerHTML += nertworkError;
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
      </ons-list-item>`;
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
    </ons-list-item>`;
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

//Get Daily Verse
function dailyVerse() {
  const dailyVerse = document.getElementById("daily_verse");

  async function getVerse() {
    const response = await fetch(
      "https://beta.ourmanna.com/api/v1/get/?format=json"
    );
    return await response.json();
  }
  getVerse()
    .then((verse) => {
      dailyVerse.innerHTML = `${
        Object.values(verse)[0]["details"]["text"]
      }  <span style="float: right; margin-top : 20px;">${
        Object.values(verse)[0]["details"]["reference"]
      }</span>`;
    })
    .catch((err) => {
      dailyVerse.innerHTML = err;
    });
}
