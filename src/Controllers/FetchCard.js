document.addEventListener('DOMContentLoaded', function () {
    fetchCard(); // Llama a la función CreateTask cuando la página carga
});
function getAllTasks() {
    // Get the last task ID from localStorage to know how many tasks there are
    let lastTaskId = localStorage.getItem("lastTaskId");
    const taskContainer = document.getElementById('sticker');

    // Check if there are tasks stored
    if (lastTaskId === null) { 
      console.log("No tasks found.");
      return;
    }
  
    // Convert the task ID to an integer
    lastTaskId = parseInt(lastTaskId);
  
    // Loop through all task keys and retrieve the tasks
    for (let i = 1; i <= lastTaskId; i++) {
      const taskKey = `task-${i}`;
      const task = localStorage.getItem(taskKey);
  
      if (task !== null) {
        // Log the task to the console (you can render it in your UI instead)
        console.log(`Task ${i}: ${task}`);
        taskContainer.innerHTML  += task;

      } else {
        console.log(`Task ${i} does not exist.`);
      }
    }
  }
  
  // Call the function when the page loads to retrieve all tasks
  document.addEventListener('DOMContentLoaded', function () {
    getAllTasks(); // This will log all stored tasks to the console
  });
  

