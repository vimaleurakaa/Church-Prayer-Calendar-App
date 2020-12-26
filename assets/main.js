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

  //console.log(events);

  function calender() {
    $("#container").simpleCalendar({
      fixedStartDay: 0, // begin weeks by sunday
      disableEmptyDetails: true,

      onDateSelect: function (date) {
        const dateValue = date.toLocaleDateString().replaceAll("/", "-");
        getSelectedDate(dateValue);
      },
    });
  }
  calender();
});
