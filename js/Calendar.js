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

    days.forEach((day) => buildADay(day));

    for (let index = 7; index > days[days.length - 1]["dag i vecka"]; index--) {
      createEmtyDay();
    }

    setupClickEventOnDay();
  } catch (error) {}
}

function clearCalendar() {
  const calendarDays = document.getElementById("calendar-Days");
  calendarDays.innerHTML = "";
}

/*
<template id="daycontanertemp">
        <div class="daycontaner">
            <div class="row">
                <div class="col">
                    <div class="day-Nr ">1</div>
                    <div class="todo-nr circle d-inline-flex flex justify-content-center align-items-center">0</div>
                </div>
                <div class="day-red-day col">sveriges nationaldag</div>
            </div>
        </div>
</template>
*/
function buildADay(dayinfo) {
  const datum = dayinfo.datum.split("-");

  // get the a copy of the element of a daycontaner
  const daycontaner = document
    .querySelector("#daycontanertemp")
    .content.cloneNode(true)
    .querySelector(".daycontaner");

  // check if we have Selekted this this day
  if (state.cutentSelektedDay === dayinfo["datum"]) {
    daycontaner.classList.add("selected");
  }
  //write the day nr
  setTextOnComponent(daycontaner, ".day-Nr", datum[datum.length - 1]);

  //get how many todo on this day
  const todoNr = getTodosByDate(new Date(dayinfo.datum))?.length || 0;
  if (todoNr) {
    //if we have todo we write it on the day
    setTextOnComponent(daycontaner, ".todo-nr", todoNr);
  } else {
    //if we do not have todo we write delete the sub element
    daycontaner.querySelector(".todo-nr").remove();
  }

  //set the datum in the data-calenderdate info
  daycontaner.dataset.calenderdate = dayinfo["datum"];

  //check if it is red day and add the red on daycontaner if it is
  if (dayinfo["röd dag"] === "Ja") {
    daycontaner.classList.add("red");
  }

  //check if this is a holy day
  if (dayinfo["helgdag"]) {
    setTextOnComponent(daycontaner, ".day-red-day", dayinfo["helgdag"]);
  } else {
    daycontaner.querySelector(".day-red-day").remove();
  }

  //get calendar-Days so that I can add daycontaner on it
  const calendarDays = document.getElementById("calendar-Days");
  calendarDays.append(daycontaner);
}

function setTextOnComponent(contaner, querySelector, text) {
  contaner.querySelector(querySelector).innerText = text;
}

function createEmtyDay() {
  const emtyDay = document.createElement("div");
  emtyDay.classList.add("daycontaner");

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
  allDays.forEach((day) => {
    day.addEventListener("click", (event) => {
      const data = event.currentTarget.dataset.calenderdate;
      if (state.cutentSelektedDay === data) {
        state.cutentSelektedDay = null;
      } else {
        state.cutentSelektedDay = data;
      }

      reloadContent();
    });
  });
}
