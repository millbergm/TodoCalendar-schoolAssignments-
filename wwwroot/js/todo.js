
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

var allTodos = new Array();

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