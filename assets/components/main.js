//ons.forcePlatformStyling("ios");

$(document).ready(function () {
  $(".current_year").text(new Date().getFullYear());
  //Navigate Page on Date Select
  function getSelectedDate(clickDate) {
    document.getElementById("root").pushPage("event.html");
    if (clickDate) {
      location.hash = `date?${clickDate}`;
    }
  }

  //document.getElementById("event").onInit = function () {};
  //Navigate Page direct URL
  if (location.hash.split("?")[0] === "#date") {
    document.getElementById("root").pushPage("event.html");
  }

  //init Calender
  function calender() {
    $("#container").simpleCalendar({
      fixedStartDay: 0,
      disableEmptyDetails: true,

      onDateSelect: function (date) {
        let d = new Date(date);
        dd = d.getDate();
        mn = d.getMonth();
        mn++;
        yy = d.getFullYear();
        const dateValue = mn + "-" + dd + "-" + yy;
        getSelectedDate(dateValue);
      },
    });
  }
  calender();
});
