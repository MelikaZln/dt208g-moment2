var TodoList = /** @class */ (function () {
    function TodoList() {
        this.todos = [];
        this.loadFromLocalStorage();
    }
    TodoList.prototype.addTodo = function (task, priority) {
        // Kontrollera om task och priority är korrekta
        if (task.length === 0 || priority < 1 || priority > 3) {
            return false;
        }
        // Skapa ett nytt Todo-objekt och lägg till i todos-arrayen
        var newTodo = {
            task: task,
            completed: false,
            priority: priority, // Konvertera priority till unionstypen 1 | 2 | 3
            createdAt: new Date().toLocaleString() // Lägg till tid för skapande
        };
        this.todos.push(newTodo);
        this.saveToLocalStorage(); // Spara till LocalStorage
        return true;
    };
    TodoList.prototype.markTodoCompleted = function (todoIndex) {
        // Kontrollera om todoIndex är inom rätt intervall
        if (todoIndex < 0 || todoIndex >= this.todos.length) {
            return;
        }
        // Markera todo som klar
        this.todos[todoIndex].completed = true;
        this.saveToLocalStorage(); // Spara till LocalStorage
    };
    TodoList.prototype.getTodos = function () {
        return this.todos;
    };
    TodoList.prototype.saveToLocalStorage = function () {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    };
    TodoList.prototype.loadFromLocalStorage = function () {
        var savedTodos = localStorage.getItem('todos');
        if (savedTodos !== null) {
            this.todos = JSON.parse(savedTodos);
        }
    };
    TodoList.prototype.removeTodo = function (index) {
        if (index < 0 || index >= this.todos.length) {
            return;
        }
        this.todos.splice(index, 1);
        this.saveToLocalStorage(); // Spara till LocalStorage efter borttagning
    };
    return TodoList;
}());
// Skapa en instans av TodoList-klassen
var todoList = new TodoList();
// Händelsehantering för formuläret
var form = document.getElementById('todoForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var taskInput = document.getElementById('task');
    var priorityInput = document.getElementById('priority');
    var task = taskInput.value.trim();
    var priority = parseInt(priorityInput.value);
    if (todoList.addTodo(task, priority)) {
        renderTodos();
        taskInput.value = '';
    }
    else {
        alert('Felaktig uppgift eller prioritet.');
    }
});
// Funktion för att rendera todo-listan
function renderTodos() {
    var todoListElement = document.getElementById('todoList');
    todoListElement.innerHTML = '';
    todoList.getTodos().forEach(function (todo, index) {
        var listItem = document.createElement('li');
        listItem.innerHTML = "\n            <input type=\"checkbox\" id=\"todo".concat(index, "\" ").concat(todo.completed ? 'checked' : '', ">\n            <label for=\"todo").concat(index, "\">").concat(todo.task, " - Prioritet: ").concat(todo.priority, " - Skapad: ").concat(todo.createdAt, "</label>\n            <button class=\"removeButton\">Ta bort</button>\n        ");
        var checkbox = listItem.querySelector("#todo".concat(index));
        var removeButton = listItem.querySelector('.removeButton');
        if (checkbox && removeButton) {
            checkbox.addEventListener('change', function () {
                todoList.markTodoCompleted(index);
                renderTodos();
            });
            removeButton.addEventListener('click', function () {
                todoList.removeTodo(index);
                renderTodos();
            });
        }
        todoListElement.appendChild(listItem);
    });
}
// Rendera todo-listan vid sidans laddning
window.addEventListener('load', renderTodos);
