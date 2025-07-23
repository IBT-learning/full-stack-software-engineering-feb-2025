const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const errorMsg = document.getElementById('error-msg');
const themeToggle = document.getElementById('theme-toggle');

window.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  loadTheme();
});

// localStorage.setItem()

addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (!text) {
    showError('Task cannot be empty!');
    return;
  }

  createTask(text);
  taskInput.value = '';
  saveTasks();
});

themeToggle.addEventListener('click', toggleTheme);

function createTask(text, isCompleted = false) {
  const li = document.createElement('li');
  li.className = 'task-item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';
  checkbox.checked = isCompleted;

  if (isCompleted) {
    li.classList.add('completed');
  }

  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed', checkbox.checked);
    saveTasks();
  });

  const span = document.createElement('span');
  span.textContent = text;

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const editBtn = document.createElement('button');
  editBtn.innerHTML = '✏️';
  editBtn.className = 'action-btn';
  editBtn.onclick = () => editTask(span, li);

  const delBtn = document.createElement('button');
  delBtn.innerHTML = '🗑️';
  delBtn.className = 'action-btn';
  delBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  actions.appendChild(editBtn);
  actions.appendChild(delBtn);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(actions);
  taskList.appendChild(li);
}

function editTask(span, li) {
  const oldText = span.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = oldText;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') input.blur();
  });

  input.addEventListener('blur', () => {
    const newText = input.value.trim();
    if (!newText) {
      showError('Task cannot be empty!');
      input.replaceWith(span);
      return;
    }
    span.textContent = newText;
    input.replaceWith(span);
    saveTasks();
  });

  span.replaceWith(input);
  input.focus();
}

function showError(msg) {
  errorMsg.textContent = msg;
  setTimeout(() => (errorMsg.textContent = ''), 3000);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task-item').forEach((li) => {
    const text = li.querySelector('span').textContent;
    const completed = li.querySelector('.task-checkbox').checked;
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem('tasks')) || [];
  saved.forEach((task) => createTask(task.text, task.completed));
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
}

function loadTheme() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
  } else {
    themeToggle.textContent = '🌙';
  }
}
