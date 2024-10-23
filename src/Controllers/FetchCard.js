document.addEventListener('DOMContentLoaded', function () {
    fetchCard(); // Llama a la función CreateTask cuando la página carga
});
function getAllTasks() {
    // Get the last task ID from localStorage to know how many tasks there are
    let lastTaskId = localStorage.getItem("lastTaskId");
    const taskContainer = document.getElementById('taskContainer');

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
        const [title, description, dueDate, workarea] = task.split(';');

        // Convert the due date to a Date object
        const dueDateObj = new Date(dueDate);


        function color() {
          if (workarea === "Front") {
            return "pink";
          } else if (workarea === "Back") {
            return "blue";
          } else if (workarea === "Server") {
            return "yellow";
          } else if (workarea === "Testing") {
            return "green";
          }
        }
        const postItColour =  color();
        console.log(title, postItColour, dueDateObj);

        // Log the task to the console (you can render it in your UI instead)
        taskContainer.innerHTML  += `
        <div class="drag">
          <task-sticker title=${title} postItColour=${postItColour} dueDate=${dueDate}></task-sticker>
        </div>
        
        `;

      } else {
        console.log(`Task ${i} does not exist.`);
      }
    }
  }
  
  // Call the function when the page loads to retrieve all tasks
  document.addEventListener('DOMContentLoaded', function () {
    getAllTasks(); // This will log all stored tasks to the console
  });
  

