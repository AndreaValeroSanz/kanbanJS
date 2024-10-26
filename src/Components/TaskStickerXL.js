class TaskStickerXL extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const title = this.getAttribute('title') || 'Untitled Task';
    const description = this.getAttribute('description') || 'Please, remember to write a task description.';
    const postItColour = this.getAttribute('postItColour');
    const dueDate = this.getAttribute('dueDate') || 'No date assigned.';
    const workarea = this.getAttribute('workarea') || ''; // Comma-separated list for selected workareas
    const modalId = `taskModal-${Math.floor(Math.random() * 10000)}`;

    // Render modal content with editable inputs, including workarea checkboxes
    this.render(title, description, postItColour, dueDate, workarea, modalId);
    this.addModalInitialization(modalId);
  }

  render(title, description, postItColour, dueDate, workarea, modalId) {
    // Split existing workarea selections into an array
    const selectedWorkareas = workarea.split(',');

    this.innerHTML = `
      <style>
        .background-yellow { background-color: #fadd80; }
        .background-blue { background-color: #92c4de; }
        .background-pink { background-color: #ed98b4; }
        .background-green { background-color: #a6d0b3; }
      </style>

      <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content background-${postItColour}">
            <div class="modal-header">
              <input type="text" class="form-control" id="editTitle-${modalId}" placeholder="Task Title" value="${title}">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <input type="text" class="form-control" id="editDueDate-${modalId}" placeholder="Due Date" value="${dueDate}">
              </div>
              <div class="mb-3">
                <textarea class="form-control" id="editDescription-${modalId}" rows="3" placeholder="Task Description">${description}</textarea>
              </div>
              <div class="mb-3">
                <label>Workarea</label>
                <div>
                  <label><input type="checkbox" class="workarea-option" value="Front" ${selectedWorkareas.includes('Front') ? 'checked' : ''}> Front</label><br>
                  <label><input type="checkbox" class="workarea-option" value="Back" ${selectedWorkareas.includes('Back') ? 'checked' : ''}> Back</label><br>
                  <label><input type="checkbox" class="workarea-option" value="Server" ${selectedWorkareas.includes('Server') ? 'checked' : ''}> Server</label><br>
                  <label><input type="checkbox" class="workarea-option" value="Testing" ${selectedWorkareas.includes('Testing') ? 'checked' : ''}> Testing</label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-danger delete-task">Delete</button>
              <button type="button" class="btn btn-outline-secondary share-task">Share</button>
              <button type="button" class="btn btn-primary save-task">Save</button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.addEventListeners(modalId);
  }

  addModalInitialization(modalId) {
    setTimeout(() => {
      const modalElement = this.querySelector(`#${modalId}`);
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      } else {
        console.error('Modal element not found for initialization.');
      }
    }, 0);
  }

  addEventListeners(modalId) {
    const deleteButton = this.querySelector('.delete-task');
    const shareButton = this.querySelector('.share-task');
    const saveButton = this.querySelector('.save-task');
    const titleInput = this.querySelector(`#editTitle-${modalId}`);
    const dueDateInput = this.querySelector(`#editDueDate-${modalId}`);
    const descriptionInput = this.querySelector(`#editDescription-${modalId}`);
    const workareaCheckboxes = this.querySelectorAll('.workarea-option');

    deleteButton.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this task?')) {
        const taskKey = this.getAttribute('data-key');
        if (taskKey) {
          localStorage.removeItem(taskKey);
          document.querySelector(`#${modalId}`)?.remove();
          window.location.reload();
        } else {
          console.error('No data-key found to delete task.');
        }
      }
    });

    shareButton.addEventListener('click', () => {
      navigator.share({
        title: titleInput.value,
        text: descriptionInput.value,
        url: window.location.href,
      }).catch(error => alert(`Error sharing task: ${error}`));
    });

    saveButton.addEventListener('click', () => {
      const updatedTitle = titleInput.value;
      const updatedDueDate = dueDateInput.value;
      const updatedDescription = descriptionInput.value;

      // Collect selected workareas
      const selectedWorkareas = Array.from(workareaCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value)
        .join(',');

      const taskKey = this.getAttribute('data-key');

      if (taskKey) {
        // Save updates to localStorage
        localStorage.setItem(taskKey, `${updatedTitle};${updatedDescription};${updatedDueDate};${selectedWorkareas}`);
        alert('Task updated successfully!');
        window.location.reload();
      } else {
        console.error('No data-key found to save task.');
      }
    });
  }
}

customElements.define('task-sticker-xl', TaskStickerXL);
