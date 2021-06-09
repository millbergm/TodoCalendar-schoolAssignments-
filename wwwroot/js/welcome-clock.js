window.setInterval(getCurrentDateTime, 1000);

function addZeroBefore(n) {
  return (n < 10 ? '0' : '') + n;
}

function getCurrentDateTime() {
    const timeElement = document.getElementById('welcome-time');
    const dateElement = document.getElementById('welcome-date');

    const currentDate = new Date();

    let hours = addZeroBefore(currentDate.getHours());
    let minutes = addZeroBefore(currentDate.getMinutes());
    let seconds = addZeroBefore(currentDate.getSeconds());

    timeElement.innerText = hours + ' : ' + minutes + ' : ' + seconds;

    let date = currentDate.toLocaleString('sv-SE', { month: 'long', year: 'numeric', day: 'numeric'});
    let weekday = currentDate.toLocaleString('sv-SE', { weekday: 'long' });

    dateElement.innerText = weekday + ', ' + date;
}
