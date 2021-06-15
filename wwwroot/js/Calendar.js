function initCalender(currentDate) {
  setupCalender(currentDate.getFullYear(), currentDate.getMonth() + 1);
}

async function setupCalender(year, month) {
  try {
    clearCalendar();

    const days = (await getDaysInfo(year, month)).dagar;

    for (let index = 1; index < days[0]["dag i vecka"]; index++) {
      createEmtyDay();
    }

    days.forEach((day) => buldADay(day));

    for (let index = 7; index > days[days.length - 1]["dag i vecka"]; index--) {
      createEmtyDay();
    }

    setupClickEventOnDay();
  } catch (error) {}
}

function clearCalendar() {
  const temp = document.querySelector(".daycontaner.temp").cloneNode(true);
  const calendarDays = document.getElementById("calendar-Days");
  calendarDays.innerHTML = "";
  calendarDays.append(temp);
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
function buildADay(dayinfo) {
  const datum = dayinfo.datum.split("-");
  console.log(dayinfo.datum,new Date(dayinfo.datum).getMonth())

  const daycontaner = document
    .querySelector(".daycontaner.temp")
    .cloneNode(true);
  daycontaner.classList.remove("temp");

  setTextOnComponent(daycontaner, ".day-Nr", datum[datum.length - 1]);

  setTextOnComponent(
    daycontaner,
    ".todo-nr",
    getTodosByDate(new Date(dayinfo.datum))?.length || 0
  );

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

async function getDaysInfo(year, month) {
  const response = await fetch(
    `https://sholiday.faboul.se/dagar/v2.1/${year}/${month}`
  );
  return response.json();
}

function setupClickEventOnDay() {
  const allDays = document.querySelectorAll(
    "div.daycontaner[data-calenderdate]"
  );
  let cutentSelektedDay = null;
  allDays.forEach((day) => {
    day.addEventListener("click", (event) => {
      const data = event.currentTarget.getAttribute("data-calenderdate");
      if (cutentSelektedDay === data) {
        cutentSelektedDay = null;
      } else {
        cutentSelektedDay = data;
      }
      document.querySelector(".selected")?.classList.remove("selected");

      if (cutentSelektedDay) {
        event.currentTarget.classList.add("selected");
      }

      console.log(cutentSelektedDay);

      if (cutentSelektedDay){
        
        populateTodoContainer(new Date(cutentSelektedDay));
      }
      else {
        populateTodoContainer(null);
      }
    });
  });
}
