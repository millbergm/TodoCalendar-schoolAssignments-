class TodoItem {
    constructor(title, startDate, stopDate) {
        this.title = title;
        this.startDate = startDate;
        this.stopDate = stopDate;
    }
}

var allTodos = new Array();

function addNewTodo(TodoItem) {
    allTodos.push(this.TodoItem);
}

function deleteTodoByIndex(i) {
    allTodos.splice(i, 1);
}