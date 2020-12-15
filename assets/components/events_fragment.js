function eventsFragment() {
  // Lifecycle hook (`init`)
  document.getElementById("event").onInit = function () {
    document.querySelector("#root_2").innerHTML += dateFragment();
    // $(".page__background").css({
    //   background:
    //     "linear-gradient(45deg, rgba(0,0,0, .5), rgba(0,0,0, .6)), url(./assets/img/bg-img.jpg) center no-repeat",
    //   "background-size": "cover",
    // });
    //ons.notification.toast("Page 2 created", { timeout: 300 });

    // Lifecycle hooks (`show`, `hide`, `destroy`)
    this.onShow = function () {
      //ons.notification.toast("Page 2 shown", { timeout: 300 });
    };

    this.onHide = function () {
      //ons.notification.toast("Page 2 hidden", { timeout: 300 });
    };

    this.onDestroy = function () {
      //ons.notification.toast("Page 2 destroyed", { timeout: 300 });
    };
  };
}

function backPress() {
  console.log("backpressed");
}

function dateFragment() {
  const urlPath = location.href.substring(location.href.indexOf("?") + 1);
  const checkParams = location.href.indexOf("?") != -1;
  const jsonData = events[urlPath];
  let content;

  // Main Content layout

  function getJSONContent() {
    return `${jsonData.map(contentLayout).join("")}`;
  }

  function contentLayout(data) {
    return `
    <h1>${data.events}</h1>
    ${prayer_request(data.prayer_request)}
    `;
  }

  function prayer_request(prayerdata) {
    return `
    <h3>${prayerdata.map((data) => `<li>${data}</li>`).join("")}</h3>
    `;
  }

  if (checkParams) {
    content = getJSONContent();
  }

  return content;
}
