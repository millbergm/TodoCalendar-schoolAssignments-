function initTodo() {
  populateTodoContainer();
  const todoString = localStorage.getItem("allTodos");
  // TODO: Lägg till raden nedan igen! Pajjar test-datan nedanför.
  // allTodos = JSON.parse(todoString || "[]");
  // renderTodoList();
}

class TodoItem {
  /**
   * @param {Date} startDate
   * @param {Date} stopDate
   */
  constructor(title, info, startDate, stopDate) {
    this.id = incrementId();
    this.title = title;
    this.info = info;
    this.startDate = startDate;
    this.stopDate = stopDate;
    this.isDone = false;
  }
}

var nextId = 0;
// TODO: Spara i local storage tillsamman med arrayen.

function incrementId() {
  return nextId++;
}

// TODO: Kan behöva ändra denna när man använder JSON.parse (se ovan)?
var allTodos = new Array();

function addFormEventListener() {
  let form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmit);
}

function addNewTodo(TodoItem) {
  allTodos.push(TodoItem);
}

// Testdata!
// allTodos.length = 0;
addNewTodo(
  (TodoItem = {
    title: "foo1_title",
    info: "foo1",
    startDate: new Date(2021, 05, 14),
    stopDate: new Date(2021, 11, 11),
  })
);
addNewTodo(
  (TodoItem = {
    title: "foo2_title",
    info: "foo2",
    startDate: new Date(2021, 05, 14),
    stopDate: new Date(2021, 10, 10),
  })
);
addNewTodo(
  (TodoItem = {
    title: "foo3_title",
    info: "foo3",
    startDate: new Date(2021, 06, 15),
    stopDate: new Date(2021, 9, 9),
  })
);

function deleteTodoByIndex(i) {
  allTodos.splice(i, 1);
}

function changeStatusOfTodo(i) {
  var todo = allTodos[i];

  if (todo.isDone == false) {
    todo.isDone = true;
  } else {
    todo.isDone = false;
  }
}

/**
 *
 * @param {Date} date
 * @returns
 */
function getTodosByDate(date) {
  let todosByDate = [];
  todosByDate = allTodos.filter(
    (TodoItem) => getFullDate(TodoItem.startDate) === getFullDate(date)
  );

  return todosByDate;
}

function getFullDate(date) {
  var month = date.getMonth(); //months from 1-12
  var day = date.getDate();
  var year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

function getAllTodos() {
  console.log("allTodos");
  return allTodos;
}

/**
 *
 * @param {Date} date
 * @returns
 */
function populateTodoContainer(date) {
  todotemp = document.querySelector("div.todoitem.temp").cloneNode(true);

  const todocontainer = document.getElementById("todocontainer");
  todocontainer.innerHTML = "";
  todocontainer.append(todotemp);

  let todos = [];
  if (date) {
    console.log("date", date);
    todos = getTodosByDate(date);
  } else {
    // console.log("hjghfjfjgfhj");
    todos = getAllTodos();
  }
  console.log(todos);

  for (const todo of todos) {
    todoitem = todotemp.cloneNode(true);

    setId(todoitem);

    todoitem.classList.remove("temp");
    todoitem.querySelector(".accordion-header p").innerHTML = todo.title;
    todoitem.querySelector(".todoInfo").innerHTML = todo.info;
    todoitem.querySelector(".todoStartDate").innerHTML = todo.startDate;
    todoitem.querySelector(".todoEndDate").innerHTML = todo.stopDate;

    todoitem.querySelector(".todoDone").dataset.id = todo.id;
    todoitem.querySelector(".todoEdit").dataset.id = todo.id;
    todoitem.querySelector(".todoDelete").dataset.id = todo.id;

    todoitem.querySelector(".todoDone").addEventListener("click", todoDone);
    todoitem.querySelector(".todoEdit").addEventListener("click", todoEdit);
    todoitem.querySelector(".todoDelete").addEventListener("click", todoDelete);

    todocontainer.append(todoitem);
  }
}

function todoDone(event) {
  console.log("todoDone");
}

function todoEdit(event) {
  console.log("todoEdit");
}

function todoDelete(event) {
  console.log("todoDelete");
}

function setId(todotemp) {
  const headingId = "headingId" + uuidv4();
  const collapseId = "collapseId" + uuidv4();
  const AccordionId = "AccordionId" + uuidv4();

  const todoAccordion = todotemp.querySelector("#todoAccordion");
  const headingOne = todotemp.querySelector("#headingOne");
  const headingOneButton = headingOne.querySelector("button");
  const collapseOne = todotemp.querySelector("#collapseOne");

  todoAccordion.id = AccordionId;
  headingOne.id = headingId;

  headingOneButton.dataset.bsTarget = "#" + collapseId;
  headingOneButton.setAttribute("aria-controls", collapseId);

  collapseOne.id = collapseId;
  collapseOne.setAttribute("aria-labelledby", headingId);
  collapseOne.dataset.bsParent = "#" + AccordionId;
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

// Testdata här!
console.log(allTodos);
// populateTodoContainer(new Date(2021, 05, 14));
// Testdata här!

function saveTodosToLocalStorage() {
  localStorage.setItem("allTodos", JSON.stringify(allTodos));
}

/**
 * @param {Event} event
 */
function handleFormSubmit(event) {
  event.preventDefault();
  var todoTitle = document.getElementById("todoTitle");
  var todoInfo = document.getElementById("todoInfo");
  var startDate = document.getElementById("startDate").value;
  var stopDate = document.getElementById("stopDate").value;
  var TodoItem = {
    title: todoTitle.value,
    info: todoInfo.value,
    startDate: startDate,
    stopDate: stopDate,
    isDone: false,
  };
  allTodos.push(TodoItem);
  todoTitle.value = "";
  todoInfo.value = "";
  document.getElementById("startDate").value = "";
  document.getElementById("stopDate").value = "";

  saveTodosToLocalStorage();
  //  renderTodoList();
}

function renderTodoList() {
  const ul = document.querySelector("ul");
  ul.innerText = "";

  for (var todo of allTodos) {
    const li = document.createElement("li");
    li.innerText = todo;
    ul.append(li);
  }
}
