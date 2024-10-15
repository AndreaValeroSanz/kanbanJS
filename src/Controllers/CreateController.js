function CreateTask() {
    const id = Date.now();
    const key = `task-${id}`;
    const description = "que tal";
    localStorage.setItem(key, description);
    console.log("Se ha creado una nueva tarea");
    
}

  // Get the element that should trigger the CreateTask function

  const taskColumn = document.querySelector('task-column[title="Done"]');
  taskColumn.addEventListener('click', CreateTask);
  
  // Attach the event listener to the element