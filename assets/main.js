ons.forcePlatformStyling("ios");

$(document).ready(function () {
  //Navigate Page on Date Select
  function getSelectedDate(clickDate) {
    document.getElementById("root").pushPage("event.html");
    if (clickDate) {
      location.hash = `date?${clickDate}`;
    }
  }

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
        const dateValue = date.toLocaleDateString().replaceAll("/", "-");
        getSelectedDate(dateValue);
      },
    });
  }
  calender();
});
