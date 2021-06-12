const monthBackButton = document.getElementById('month-back');
monthBackButton.addEventListener('click', monthBack);

const monthForwardButton = document.getElementById('month-forward');
monthForwardButton.addEventListener('click', monthForward);

const monthSpan = document.getElementById("current-month");
let currentDateChangeMonths;

function initMonthButtons(date) {
    currentDateChangeMonths = date;
    monthSpan.innerText = currentDateChangeMonths.toLocaleString('sv-SE', { month: 'long', year: 'numeric' });
}

function monthBack() {
    currentDateChangeMonths.setMonth(currentDateChangeMonths.getMonth() - 1);
    monthSpan.innerText = currentDateChangeMonths.toLocaleString('sv-SE', { month: 'long', year: 'numeric' });
    setupCalender(currentDateChangeMonths.getFullYear(), currentDateChangeMonths.getMonth() + 1);
}

function monthForward() {
    currentDateChangeMonths.setMonth(currentDateChangeMonths.getMonth() + 1);
    monthSpan.innerText = currentDateChangeMonths.toLocaleString('sv-SE', { month: 'long', year: 'numeric' });
    setupCalender(currentDateChangeMonths.getFullYear(), currentDateChangeMonths.getMonth() + 1);
}
