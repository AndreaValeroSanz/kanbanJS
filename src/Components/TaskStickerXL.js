class TaskStickerXL extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const title = this.getAttribute('title') || 'Untitled Task';
    const description = this.getAttribute('description') || 'Please, remember to write a task description.';
    const postItColour = this.getAttribute('postItColour');
    const dueDate = this.getAttribute('dueDate') || 'No date assigned.';
    const modalId = `taskModal-${Math.floor(Math.random() * 10000)}`;

    // Render modal content with editable inputs
    this.render(title, description, postItColour, dueDate, modalId);
    this.addModalInitialization(modalId);
  }

  render(title, description, postItColour, dueDate, modalId) {
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
      const taskKey = this.getAttribute('data-key');

      if (taskKey) {
        // Save updates to localStorage
        localStorage.setItem(taskKey, JSON.stringify({
          title: updatedTitle,
          description: updatedDescription,
          dueDate: updatedDueDate,
          postItColour: this.getAttribute('postItColour')
        }));
        alert('Task updated successfully!');
        window.location.reload();
      } else {
        console.error('No data-key found to save task.');
      }
    });
  }
}

customElements.define('task-sticker-xl', TaskStickerXL);
