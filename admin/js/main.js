let prayerdata = [];
let holidaydata = [];
const database = firebase.database().ref("data");

function appendPrayerReuqest(id) {
  let prayerRequest = `
  <div class="col-12 d-flex" id="prayer_req_${id}">
        <input placeholder="Prayer Request ${
          id + 1
        }" class="form-control prayer-input" type="text" value="">
        <button type="button" onclick="delPrayer('${id}')" class="btn btn-danger m-auto">Delete</button>
  </div>`;

  $("#prayer-requests").append(prayerRequest);
}

function appendHolidays(id) {
  let holiday = `
    <div class="col-12 d-flex" id="holiday_req_${id}">
          <input placeholder="Holiday Request ${
            id + 1
          }" class="form-control holiday-input" type="text" value="">
          <button type="button" onclick="delHoliday('${id}')" class="btn btn-danger m-auto">Delete</button>
    </div>`;

  $("#holiday-requests").append(holiday);
}

function delPrayer(id) {
  let element = document.getElementById("prayer_req_" + id);
  element.parentNode.removeChild(element);
}

function delHoliday(id) {
  let element = document.getElementById("holiday_req_" + id);
  element.parentNode.removeChild(element);
}

$(document).ready(function () {
  let prayercount = 0;
  let holidaycount = 0;

  $("#add-prayer").click(function () {
    appendPrayerReuqest(prayercount++);
  });

  $("#add-holiday").click(function () {
    appendHolidays(holidaycount++);
  });
  //getFirebaseData();
});

//Retrive Selected Date
function getCalenderDate() {
  d = new Date(document.getElementById("date-picker").value);
  dd = d.getDate();
  mn = d.getMonth();
  mn++;
  yy = d.getFullYear();
  return mn + "-" + dd + "-" + yy;
}

//Retriving DOM Prayer Data
function getPrayerData() {
  const element = document.getElementsByClassName("prayer-input");
  for (i = 0; i < element.length; i++) {
    let obj = {};
    obj["data"] = element[i].value;
    prayerdata.push(obj);
  }
  console.log(prayerdata);
}

//Retriving DOM Holiday Data
function getHolidayData() {
  const element = document.getElementsByClassName("holiday-input");
  for (i = 0; i < element.length; i++) {
    let obj = {};
    obj["data"] = element[i].value;
    holidaydata.push(obj);
  }
  console.log(holidaydata);
}

function sendData() {
  if (getCalenderDate() != "NaN-NaN-NaN") {
    getPrayerData();
    getHolidayData();

    //UpdatePrayer Data
    for (i = 0; i < prayerdata.length; i++) {
      setPrayerData(prayerdata[i].data);
    }
    //UpdateHoliday Data
    for (i = 0; i < holidaydata.length; i++) {
      let datepicker = new Date(document.getElementById("date-picker").value);
      setHolidayData(datepicker.getDate() + " - " + holidaydata[i].data);
    }

    document.getElementById();
  } else alert("Input Date cannot be empty");
}

//Write data to realtime database
function setHolidayData(value) {
  const date = database.child(getCalenderDate());
  const child = date.child("holidayData");
  const key = child.push().key;
  child.update({ [key]: value });
}
//Write data to realtime database
function setPrayerData(value) {
  const date = database.child(getCalenderDate());
  const child = date.child("prayerData");
  const key = child.push().key;
  child.update({ [key]: value });
}

// //Retrive firebase data & store local
// function getFirebaseData() {
//   return firebase
//     .database()
//     .ref("data")
//     .once("value")
//     .then(function (snapshot) {
//       let value = snapshot.val();
//       localStorage.setItem("admin_database", JSON.stringify(value));
//     });
// }

// //Append data to HTML

// let firebasedata = JSON.parse(localStorage.getItem("admin_database"));
// console.log(firebasedata);
