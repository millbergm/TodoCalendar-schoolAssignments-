
class TodoItem {
    /**
     * @param {Date} startDate
     * @param {Date} stopDate
     */
    constructor(title, info, startDate, stopDate) {
        this.title = title;
        this.info = info;
        this.startDate = startDate;
        this.stopDate = stopDate;
        this.isDone = false;
    }
}

var allTodos = new Array;

function addFormEventListener() {
    let form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
}

function addNewTodo(TodoItem) {
    allTodos.push(TodoItem);
}

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
    const day = date.getDate()
    const todosByDate = allTodos.find(TodoItem => TodoItem.startDate.getDate == day);
    return todosByDate;
}

function initTodos() {
    const todoString = localStorage.getItem('allTodos');
    allTodos = JSON.parse(todoString || "[]");
    // renderTodoList();
}

function saveTodosToLocalStorage() {
    localStorage.setItem('allTodos', JSON.stringify(allTodos));
}

/**
 * @param {Event} event
 */
 function handleFormSubmit(event) {
     event.preventDefault();
     var todoTitle = document.getElementById('todoTitle');
     var todoInfo = document.getElementById('todoInfo');      
     var startDate = document.getElementById('startDate').value;      
     var stopDate = document.getElementById('stopDate').value;
     var TodoItem = {title: todoTitle.value, info: todoInfo.value, startDate: startDate, stopDate: stopDate, isDone: false}
     allTodos.push(TodoItem);
     todoTitle.value = "";
     todoInfo.value = "";     
     document.getElementById('startDate').value = "";
     document.getElementById('stopDate').value = "";
     
     saveTodosToLocalStorage();
    //  renderTodoList();
}

function renderTodoList() {
    const ul = document.querySelector('ul');
    ul.innerText = "";

    for (var todo of allTodos) {
        const li = document.createElement('li');
        li.innerText = todo;
        ul.append(li);
    }
}