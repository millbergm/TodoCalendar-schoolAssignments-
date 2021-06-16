var allTodos = new Array();

function initTodo() {
  fetchDataFromLocalStorage();
  populateTodoContainer();
}

function fetchDataFromLocalStorage() {
  const todoString = localStorage.getItem("allTodos");
  const nextIdString = localStorage.getItem("nextId");
  nextId = JSON.parse(nextIdString);
  try {
    allTodos = JSON.parse(todoString).map((todo) => {
      return new TodoItem(
        todo.id,
        todo.title,
        todo.info,
        todo.startDate,
        todo.stopDate,
        todo.isDone
      );
    });
  } catch (error) {
    console.error("The local storage is empty, create a new todo.", error);
  }
}

class TodoItem {
  /**
   * @param {Date} startDate
   * @param {Date} stopDate
   */
  constructor(id, title, info, startDate, stopDate, isDone) {
    this.id = id || incrementId();
    this.title = title;
    this.info = info;
    this.startDate = new Date(startDate);
    this.stopDate = new Date(stopDate);
    this.isDone = isDone;
  }
  // constructor(obj) {
  //     Object.assign(this, obj)
  // }
}

var nextId = 1;

function incrementId() {
  return nextId++;
}

function addFormEventListener() {
  let form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmit);
}

function addNewTodo(TodoItem) {
  allTodos.push(TodoItem);
}

function deleteTodoById(id) {
    let indexToRemove = allTodos.findIndex(obj => obj.id === id);
    indexToRemove !== -1 ? allTodos.splice(indexToRemove, 1) : console.error("Index doesn't exist.");
    saveDataToLocalStorage();
    reloadContent();
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

  todosByDate = allTodos.filter((TodoItem) => {
    if (getFullDate(TodoItem.startDate) === getFullDate(date)) {
      return true;
    } else if (TodoItem.startDate < date && TodoItem.stopDate > date) {
      return true;
    } else if (getFullDate(TodoItem.stopDate) === getFullDate(date)) {
      return true;
    } else {
      return false;
    }
  });

  return todosByDate;
}

function getFullDate(date) {
  var month = date.getMonth(); //months from 1-12
  var day = date.getDate();
  var year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

function getAllTodos() {
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
    todos = getTodosByDate(date);
  } else {
    todos = getAllTodos();
  }

  for (const todo of todos) {
    todoitem = todotemp.cloneNode(true);
    setId(todoitem, todo.id);
    todoitem.dataset.id = todo.id;

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
    var idOfSelectedTodo = event.currentTarget.dataset.id;
    deleteTodoById(parseInt(idOfSelectedTodo));
}

function setId(todotemp, id) {
  const headingId = "headingId" + id;
  const collapseId = "collapseId" + id;
  const AccordionId = "AccordionId" + id;

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

function saveDataToLocalStorage() {
  localStorage.setItem("allTodos", JSON.stringify(allTodos));
  localStorage.setItem("nextId", JSON.stringify(nextId));
}

/**
 * @param {Event} event
 */
function handleFormSubmit(event) {
  event.preventDefault();
  var todoTitle = document.getElementById("todoTitle");
  var todoInfo = document.getElementById("todoInfo");
  var startDate = new Date(document.getElementById("startDate").value);
  var stopDate = new Date(document.getElementById("stopDate").value);
  var todoItem = new TodoItem(
    0,
    todoTitle.value,
    todoInfo.value,
    startDate,
    stopDate,
    false
  );
  allTodos.push(todoItem);
  todoTitle.value = "";
  todoInfo.value = "";
  document.getElementById("startDate").value = "";
  document.getElementById("stopDate").value = "";

  console.log("handleFormSubmit");

  saveDataToLocalStorage();
  //  renderTodoList();
}

// function renderTodoList() {
//   const ul = document.querySelector("ul");
//   ul.innerText = "";

//   for (var todo of allTodos) {
//     const li = document.createElement("li");
//     li.innerText = todo;
//     ul.append(li);
//   }
// }
