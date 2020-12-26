///////////////////////////////////

let prayerData = [];

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
          }" class="form-control prayer-input" type="text" value="">
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

function getPrayerData() {
  const element = document.getElementsByClassName("prayer-input");
  for (var i = 0; i < element.length; i++) {
    var obj = {};
    obj["data"] = element[i].value;
    prayerData.push(obj);
  }
  console.log(prayerData);
}

//Write data to realtime database
function sendData() {
  getPrayerData();
  //UpdatePrayer Data
  for (i = 0; i < prayerData.length; i++) {
    setPrayerData(prayerData[i].data);
  }
}

function setPrayerData(value) {
  const database = firebase.database().ref("data");
  const date = database.child(getCalenderDate());
  const child = date.child("prayerData");
  const key = child.push().key;

  child.update({ [key]: value });
}
