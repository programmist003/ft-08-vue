const tasks = [];

function addTask() {
  const newTask = $('#new-task').val();
  if (newTask.trim() !== '') {
    tasks.push({ text: newTask, completed: false });
    const listItem = $('<li class="todo-item"></li>');
    const taskText = $('<span></span>').text(newTask);
    $(listItem).append(taskText);

    $(listItem).on('click', function () {
      const index = $(this).index();
      tasks[index].completed = !tasks[index].completed;
      $(this).toggleClass('completed');
    });

    $('#todo-list').append(listItem);
    $('#new-task').val('');
    const deleteButton = $('<button class="delete-button">❌</button>');
    $(listItem).append(deleteButton);
    
    $(deleteButton).on('click', function () {
      const index = $(listItem).index();
      tasks.splice(index, 1);
      $(listItem).remove();
    });

    

  }
}

$('form').on('submit', function (e) {
  e.preventDefault();
  addTask();
});




