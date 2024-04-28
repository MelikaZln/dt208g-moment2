interface Todo {
    task: string;
    completed: boolean;
    priority: 1 | 2 | 3;
    createdAt: string;
}

class TodoList {
    todos: Todo[];

    constructor() {
        this.todos = [];
        this.loadFromLocalStorage();
    }

    addTodo(task: string, priority: number): boolean {
        // Kontrollera om task och priority är korrekta
        if (task.length === 0 || priority < 1 || priority > 3) {
            return false;
        }

        // Skapa ett nytt Todo-objekt och lägg till i todos-arrayen
        const newTodo: Todo = {
            task: task,
            completed: false,
            priority: priority as 1 | 2 | 3, // Konvertera priority till unionstypen 1 | 2 | 3
            createdAt: new Date().toLocaleString() // Lägg till tid för skapande
        };
        this.todos.push(newTodo);
        this.saveToLocalStorage(); // Spara till LocalStorage
        return true;
    }

    markTodoCompleted(todoIndex: number): void {
        // Kontrollera om todoIndex är inom rätt intervall
        if (todoIndex < 0 || todoIndex >= this.todos.length) {
            return;
        }

        // Markera todo som klar
        this.todos[todoIndex].completed = true;
        this.saveToLocalStorage(); // Spara till LocalStorage
    }

    getTodos(): Todo[] {
        return this.todos;
    }

    saveToLocalStorage(): void {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadFromLocalStorage(): void {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos !== null) {
            this.todos = JSON.parse(savedTodos);
        }
    }
    removeTodo(index: number): void {
        if (index < 0 || index >= this.todos.length) {
            return;
        }
        this.todos.splice(index, 1);
        this.saveToLocalStorage(); // Spara till LocalStorage efter borttagning
    }
}

// Skapa en instans av TodoList-klassen
const todoList = new TodoList();

// Händelsehantering för formuläret
const form = document.getElementById('todoForm') as HTMLFormElement;
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('task') as HTMLInputElement;
    const priorityInput = document.getElementById('priority') as HTMLSelectElement;
    const task = taskInput.value.trim();
    const priority = parseInt(priorityInput.value);
    if (todoList.addTodo(task, priority)) {
        renderTodos();
        taskInput.value = '';
    } else {
        alert('Felaktig uppgift eller prioritet.');
    }
});

// Funktion för att rendera todo-listan
function renderTodos() {
    const todoListElement = document.getElementById('todoList') as HTMLUListElement;
    todoListElement.innerHTML = '';
    todoList.getTodos().forEach((todo, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox" id="todo${index}" ${todo.completed ? 'checked' : ''}>
            <label for="todo${index}">${todo.task} - Prioritet: ${todo.priority} - Skapad: ${todo.createdAt}</label>
            <button class="removeButton">Ta bort</button>
        `;
        const checkbox = listItem.querySelector(`#todo${index}`) as HTMLInputElement | null;
        const removeButton = listItem.querySelector('.removeButton') as HTMLButtonElement | null;
        if (checkbox && removeButton) {
            checkbox.addEventListener('change', function() {
                todoList.markTodoCompleted(index);
                renderTodos();
            });
            removeButton.addEventListener('click', function() {
                todoList.removeTodo(index);
                renderTodos();
            });
        }
        todoListElement.appendChild(listItem);
    });
}

// Rendera todo-listan vid sidans laddning
window.addEventListener('load', renderTodos);