const API_BASE_URL = 'https://your-api-gateway-id.execute-api.us-east-1.amazonaws.com/dev/todos';

async function getTodos() {
    const response = await fetch(API_BASE_URL);
    const todos = await response.json();
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `${todo.title} - ${todo.completed ? 'Completed' : 'Pending'}`;
        todoList.appendChild(li);
    });
}

async function addTodo() {
    const title = document.getElementById('newTodoTitle').value;
    if (!title) return;

    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, completed: false }),
    });

    const result = await response.json();
    if (result.message === 'Todo created successfully') {
        getTodos();
    }
}

document.addEventListener('DOMContentLoaded', getTodos);
