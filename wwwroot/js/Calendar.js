function initCalender() {
  const currentDate = new Date();
  setupCalender(currentDate.getFullYear(), currentDate.getMonth() + 1);
}

function setupCalender(year, month) {
  getDaysInfo(year, month, (responseText) => {
    const temp = document.querySelector(".daycontaner.temp").cloneNode(true);
    const calendarDays = document.getElementById("calendar-Days");
    calendarDays.innerHTML = "";
    calendarDays.append(temp);

    const response = JSON.parse(responseText);
    const days = response.dagar;
    for (let index = 1; index < days[0]["dag i vecka"]; index++) {
      createEmtyDay();
    }
    days.forEach((day) => buldADay(day));
    for (let index = 7; index > days[days.length - 1]["dag i vecka"]; index--) {
      createEmtyDay();
    }
  });
}

/*
<div class="daycontaner col" data-calenderDate="">
    <div class="row">
        <div class="col">
            <div class="day-Nr">1</div>
            <div class="todo-nr">0</div>
        </div>
        <div class="day-red-day col">sveriges nationaldag</div>
     </div>
</div>
*/
function buldADay(dayinfo) {
  const datum = dayinfo.datum.split("-");

  const daycontaner = document
    .querySelector(".daycontaner.temp")
    .cloneNode(true);
  daycontaner.classList.remove("temp");

  setTextOnComponent(daycontaner, ".day-Nr", datum[datum.length - 1]);
  setTextOnComponent(daycontaner, ".todo-nr", getTodosByDate(dayinfo.datum));
  daycontaner.dataset.calenderdate = dayinfo["datum"];
  if (dayinfo["röd dag"] === "Ja") {
    daycontaner.classList.add("red");
  }

  if (dayinfo["helgdag"]) {
    setTextOnComponent(daycontaner, ".day-red-day", dayinfo["helgdag"]);
  } else {
    daycontaner.querySelector(".day-red-day").remove();
  }

  const calendarDays = document.getElementById("calendar-Days");
  calendarDays.append(daycontaner);
}

function setTextOnComponent(contaner, querySelector, text) {
  contaner.querySelector(querySelector).innerText = text;
}

function createEmtyDay() {
  const emtyDay = document.createElement("div");
  emtyDay.classList.add("daycontaner");
  emtyDay.classList.add("col");
  const calendarDays = document.getElementById("calendar-Days");
  calendarDays.append(emtyDay);
}

function getDaysInfo(year, month, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open(
    "GET",
    `https://sholiday.faboul.se/dagar/v2.1/${year}/${month}`,
    true // true for asynchronous
  );
  xmlHttp.send(null);
}
