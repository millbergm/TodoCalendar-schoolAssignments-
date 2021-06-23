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
}

var nextId = 1;

function incrementId() {
  return nextId++;
}

function addFormEventListener() {
  let form = document.getElementById("newTodoForm");
  form.addEventListener("submit", handleFormSubmit);

  let form1 = document.getElementById("editTodoForm");
  form1.addEventListener("submit", handleEditFormSubmit);

  let inputStartDate = document.getElementById("startDate");
  inputStartDate.addEventListener("input", checkValidDate);

  let editInputStartDate = document.getElementById("editStartDate");
  editInputStartDate.addEventListener("input", checkValidDateOnEdit);
}

/**
 * @param {Event} event
 */
function checkValidDate(event){
  event.target.valueAsDate;

  var yesterday = new Date(calcYesterday);

  if (event.target.valueAsDate < yesterday) {
    console.log("invalid date")
    
    let form = document.getElementById("newTodoForm");
    form.classList.add("needs-validation", "was-validated")
  }
}

/**
 * @param {Event} event
 */
 function checkValidDateOnEdit(event){
  event.target.valueAsDate;

  var yesterday = new Date(calcYesterday);

  if (event.target.valueAsDate < yesterday) {
    console.log("invalid date")
    
    let form = document.getElementById("editTodoForm");
    form.classList.add("needs-validation", "was-validated")
  }
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

function toggleStatusOfTodo(id) {
  let indexToToggle = allTodos.findIndex(obj => obj.id === id);
  if (indexToToggle !== -1 && allTodos[indexToToggle].isDone === false) {
    allTodos[indexToToggle].isDone = true;
  }
  else if (indexToToggle !== -1 && allTodos[indexToToggle].isDone === true) {
    allTodos[indexToToggle].isDone = false;
  }
  else {
    console.error("Index is not available.");
  }

  saveDataToLocalStorage();
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
    todoitem.querySelector(".todoStartDate").innerHTML = todo.startDate.toDateString();
    todoitem.querySelector(".todoEndDate").innerHTML = todo.stopDate.toDateString();
    todoitem.querySelector(".todoDone").checked = todo.isDone;

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
  const idOfSelectedTodo = event.currentTarget.dataset.id;
  toggleStatusOfTodo(parseInt(idOfSelectedTodo));
}

function todoEdit(event) {
  const id = event.currentTarget.dataset.id;
  const index = allTodos.findIndex(obj => obj.id === parseInt(id));
  var todo = allTodos[index];
  
  document.forms["editTodoForm"].elements["todoId"].value = todo.id;
  document.forms["editTodoForm"].elements["editTodoTitle"].value = todo.title;
  document.forms["editTodoForm"].elements["editTodoInfo"].value = todo.info;
  document.forms["editTodoForm"].elements["editStartDate"].valueAsDate = new Date(todo.startDate);
  document.forms["editTodoForm"].elements["editStopDate"].valueAsDate = new Date(todo.stopDate);
  document.forms["editTodoForm"].elements["toggleIsDone"].checked = todo.isDone;  
}

function todoDelete(event) {
    const idOfSelectedTodo = event.currentTarget.dataset.id;
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
function handleEditFormSubmit(event){
  event.preventDefault();

  const todoId = document.getElementById("todoId").value;
  const todoTitle = document.getElementById("editTodoTitle").value;
  const todoInfo = document.getElementById("editTodoInfo").value;
  const startDate = new Date(document.getElementById("editStartDate").value);
  var stopDate = new Date(document.getElementById("editStopDate").value);
  const isDone = document.getElementById("toggleIsDone").checked;

  const index = allTodos.findIndex(obj => obj.id === parseInt(todoId));
  var todo = allTodos[index];
  
  if (document.getElementById("editStartDate").valueAsDate > document.getElementById("editStopDate").valueAsDate) {    
    stopDate = new Date(document.getElementById("editStartDate").value);
  }
  if (!Date.parse(stopDate)) {
    stopDate = new Date(document.getElementById("editStartDate").value);
  }

  var yesterday = new Date(calcYesterday());

  if (document.getElementById("editStartDate").valueAsDate > yesterday) {

    todo.title = todoTitle;
    todo.info = todoInfo;
    todo.startDate = startDate;
    todo.stopDate = stopDate;
    todo.isDone = isDone;

    saveDataToLocalStorage();
  }

  reloadContent()
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

  if (startDate > stopDate) {    
    stopDate = new Date(document.getElementById("startDate").value);
  }
  if (!Date.parse(stopDate)) {
    stopDate = new Date(document.getElementById("startDate").value);
  }

  var yesterday = new Date(calcYesterday());

  if (document.getElementById("startDate").valueAsDate > yesterday) {    
    var todoItem = new TodoItem(
      0,
      todoTitle.value,
      todoInfo.value,
      startDate,
      stopDate,
      false
    );

    allTodos.push(todoItem);
    saveDataToLocalStorage();
  }
  todoTitle.value = "";
  todoInfo.value = "";
  document.getElementById("startDate").value = "";
  document.getElementById("stopDate").value = "";
  
  reloadContent();
}

function calcYesterday() {
  var today = new Date();
  var yesterday = today.setDate(today.getDate() - 1);
  return yesterday;
}
