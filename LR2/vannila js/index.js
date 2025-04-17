const tasks = [];

function addTask() {
  const newTask = document.getElementById('new-task').value;
  if (newTask.trim() !== '') {
    tasks.push({ task: newTask, completed: false });
    const taskIndex = tasks.length - 1;

    const listItem = document.createElement('li');
    listItem.className = 'todo-item';
    const taskNameElement = document.createElement('span');
    taskNameElement.innerText = newTask;
    listItem.appendChild(taskNameElement);

    listItem.addEventListener('click', function () {
      tasks[taskIndex].completed = !tasks[taskIndex].completed;
      listItem.classList.toggle('completed');
    });

    document.getElementById('todo-list').appendChild(listItem);
    document.getElementById('new-task').value = '';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.innerText = '❌';
    listItem.appendChild(deleteButton);

    deleteButton.addEventListener('click', function (event) {
      event.stopPropagation();
      const index = tasks.indexOf({ task: newTask, completed: false });
      tasks.splice(index, 1);
      listItem.remove();
    });

    const renameButton = document.createElement('button');
    renameButton.className = 'rename-button';
    renameButton.innerText = '✏';
    listItem.appendChild(renameButton);

    renameButton.addEventListener('click', function (event) {
      event.stopPropagation();
      const newName = prompt('Введите новое имя задачи:', tasks[taskIndex].task);
      if (newName !== null && newName.trim() !== '') {
        tasks[taskIndex].task = newName;
        taskNameElement.innerText = newName;
      }
    });

  }
}

document.getElementById('add-button').onclick = addTask;
