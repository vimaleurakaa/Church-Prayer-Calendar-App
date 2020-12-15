ons.forcePlatformStyling("ios");

$(document).ready(function () {
  const rootDiv = document.getElementById("root");
  const fragmentId = location.hash.substr(1);

  // Updates dynamic content based on the fragment identifier.

  function getSelectedDate(clickDate) {
    document.getElementById("root").pushPage("event.html");

    if (clickDate) {
      location.hash = `date?${clickDate}`;
    }
  }

  function calender() {
    $("#container").simpleCalendar({
      fixedStartDay: 0, // begin weeks by sunday
      disableEmptyDetails: true,

      onCalenderLoad: function (currnetDate, currentEvent, allEvent) {},

      onDateSelect: function (date, getData) {
        //console.log("Clicked");
        const dateValue = date.toLocaleDateString();
        getSelectedDate(dateValue);
      },
    });
  }
  calender();
});
