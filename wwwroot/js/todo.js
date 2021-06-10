
class TodoItem {
    /**
     * @param {Date} startDate
     * @param {Date} stopDate
     */
    constructor(title, startDate, stopDate) {
        this.title = title;
        this.startDate = startDate;
        this.stopDate = stopDate;
        this.isDone = false;
    }
}

var allTodos = new Array();

function addNewTodo(TodoItem) {
    allTodos.push(this.TodoItem);
}

function deleteTodoByIndex(i) {
    allTodos.splice(i, 1);
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