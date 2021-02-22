//Constant Variables
const prayerdata = [];
const holidaydata = [];
const logMessage = document.getElementById("log");
const dateError = `<div class="alert alert-danger" role="alert">Date input cannot be empty!</div>`;
const prayerdataError = `<div class="alert alert-danger" role="alert">There was no prayer input, but if you have updated Holiday, its sucessfully updated!</div>`;
const messageSuccess = `<div class="alert alert-success" role="alert">Successfully Registerd!</div>`;
const database = firebase.database().ref("data");
const send = document.getElementById("sendData");

send.addEventListener("click", sendData);

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
}

//Retriving DOM Holiday Data
function getHolidayData() {
  const element = document.getElementsByClassName("holiday-input");
  for (i = 0; i < element.length; i++) {
    let obj = {};
    obj["data"] = element[i].value;
    holidaydata.push(obj);
  }
}

function sendData() {
  if (getCalenderDate() != "NaN-NaN-NaN") {
    getPrayerData();
    getHolidayData();

    if (holidaydata.length !== 0 && holidaydata[0].data !== "") {
      //UpdateHoliday Data
      for (i = 0; i < holidaydata.length; i++) {
        let datepicker = new Date(document.getElementById("date-picker").value);
        setHolidayData(datepicker.getDate() + " - " + holidaydata[i].data);
      }
    } else {
      console.log("No Holiday Data!");
    }

    if (prayerdata.length !== 0 && prayerdata[0].data !== "") {
      //UpdatePrayer Data
      for (i = 0; i < prayerdata.length; i++) {
        setPrayerData(prayerdata[i].data);
      }
    } else {
      return (logMessage.innerHTML = prayerdataError);
    }
  } else {
    return (logMessage.innerHTML = dateError);
  }
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
  child.update({ [key]: value }).then(() => {
    console.log("updated");
    logMessage.innerHTML = messageSuccess;
    setTimeout(function () {
      location.reload();
    }, 1000);
  });
}

let getrequest = firebase.database().ref("data");

getrequest.on("value", (snapshot) => {
  const data = snapshot.val();
  Object.entries(data).map((item) => {
    const table = `
      <tr>
      <th scope="row">${item[0]}</th>
      <td>${Object.values(item[1].prayerData)}</td>
      <td>${
        item[1].hasOwnProperty("holidayData")
          ? Object.values(item[1].holidayData)
          : "No Data"
      }</td>
    </tr>
    <tr>
    `;
    $("#calendar-data-table").prepend(table);
  });
});
