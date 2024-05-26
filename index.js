document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-btn');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(todo => addTodoElement(todo.text, todo.completed));

    addBtn.addEventListener('click', () => {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            addTodoElement(todoText, false);
            saveTodos();
            todoInput.value = '';
        }
    });

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const todoText = todoInput.value.trim();
            if (todoText !== '') {
                addTodoElement(todoText, false);
                saveTodos();
                todoInput.value = '';
            }
        }
    });

    function addTodoElement(text, completed) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${text}</span>
            <div>
                <input type="checkbox" class="todo-checkbox" ${completed ? 'checked' : ''}>
                <button class="delete-btn">:x:</button>
            </div>
        `;
        todoList.appendChild(li);

        const checkbox = li.querySelector('.todo-checkbox');
        if (completed) {
            li.querySelector('span').style.textDecoration = 'line-through';
        }

        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                li.querySelector('span').style.textDecoration = 'line-through';
            } else {
                li.querySelector('span').style.textDecoration = 'none';
            }
            saveTodos();
        });

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            todoList.removeChild(li);
            saveTodos();
        });

        // Autoscrolling
        todoList.scrollTop = todoList.scrollHeight;
    }

    function saveTodos() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(li => {
            const text = li.querySelector('span').textContent;
            const completed = li.querySelector('.todo-checkbox').checked;
            todos.push({ text, completed });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});
