function getCurrentDateTime() {
  const timeElement = document.getElementById("welcome-time");
  const dateElement = document.getElementById("welcome-date");

  const currentDate = new Date();

  const hours = addZeroBefore(currentDate.getHours());
  const minutes = addZeroBefore(currentDate.getMinutes());
  const seconds = addZeroBefore(currentDate.getSeconds());

  timeElement.innerText = hours + " : " + minutes + " : " + seconds;

  const date = currentDate.toLocaleString("sv-SE", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });
  const weekday = currentDate.toLocaleString("sv-SE", { weekday: "long" });

  dateElement.innerText = weekday + ", " + date;
}

function addZeroBefore(n) {
  return (n < 10 ? "0" : "") + n;
}
