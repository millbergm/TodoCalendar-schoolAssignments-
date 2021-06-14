window.addEventListener("DOMContentLoaded", main);

function main() {
  getCurrentDateTime();
  window.setInterval(getCurrentDateTime, 1000);
  initCalender();
  initTodos();
  addFormEventListener();
}
