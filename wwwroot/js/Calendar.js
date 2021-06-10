window.addEventListener("DOMContentLoaded", setup);

function setup() {
  const currentDate = new Date();
  setupCalender(currentDate.getFullYear(), currentDate.getMonth() + 1);
}
function setupCalender(year, month) {
  getDaysInfoAsync(year, month, (responseText) => {
    const response = JSON.parse(responseText);
    const days = response.dagar;
    console.log(days);
    for (let index = 1; index < days[0]["dag i vecka"]; index++) {
      console.log(index, days[0]["dag i vecka"]);
      createEmtyDay();
    }
    for (let index = 7; index > days[days.length - 1]["dag i vecka"]; index--) {
      console.log(index, days[days.length - 1]["dag i vecka"]);
      createEmtyDay();
    }
  });
}

function buldADay(dayinfo)
{

}

function createEmtyDay() {
  const emtyDay = document.createElement("div");
  emtyDay.classList.add("daycontaner");
  emtyDay.classList.add("col");
  const calendarDays = document.getElementById("calendar-Days");
  calendarDays.append(emtyDay);
}

function getDaysInfoAsync(year, month, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open(
    "GET",
    `https://sholiday.faboul.se/dagar/v2.1/${year}/${month}`,
    true
  ); // true for asynchronous
  xmlHttp.send(null);
}
