class TaskStickerXL extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const title = this.getAttribute('title');
    const description = this.getAttribute('description') || 'Please, remember to write a task description.';
    const postItColour = this.getAttribute('postItColour');
    const dueDate = this.getAttribute('dueDate') || 'No date assigned.';
    const modalId = `taskModal-${Math.floor(Math.random() * 10000)}`;
    this.render(title, description, postItColour, dueDate, modalId);
    this.addEventListeners(modalId);

    const modal = new bootstrap.Modal(this.querySelector(`#${modalId}`));
    modal.show();
  }

  render(title, description, postItColour, dueDate, modalId) {
    this.innerHTML = `
      <style>
        .background-yellow { background-color: #fadd80; }
        .background-blue { background-color: #92c4de; }
        .background-pink { background-color: #ed98b4; }
        .background-green { background-color: #a6d0b3; }
      </style>

      <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content background-${postItColour}">
            <div class="modal-header">
              <h5 class="modal-title" id="${modalId}Label">${title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!-- View Mode -->
              <div class="view-mode">
                <div class="text-center">
                  <svg width="24" height="24" fill="red">
                    <path d="M12 1.75C9.97 1.75 7.99 2.35 6.3 3.48C4.62 4.6 3.3 6.2 2.53 8.08C1.75 9.95 1.55 12 1.95 14C2.34 16 3.32 17.81 4.75 19.25C6.19 20.68 8.01 21.66 10 22.05C12 22.44 14.05 22.24 15.92 21.47C17.8 20.69 19.4 19.38 20.52 17.69C21.65 16 22.25 14.03 22.25 12C22.25 9.28 21.17 6.68 19.24 4.75C17.32 2.83 14.72 1.75 12 1.75Z"/>
                  </svg>
                  <span>${dueDate}</span>
                </div>
                <p class="description">${description}</p>
              </div>
              
              <!-- Edit Mode (initially hidden) -->
              <div class="edit-mode d-none">
                <label for="editTitle" class="form-label">Edit Title</label>
                <input type="text" class="form-control" id="editTitle" value="${title}">
                
                <label for="editDescription" class="form-label mt-2">Edit Description</label>
                <textarea class="form-control" id="editDescription" rows="3">${description}</textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-primary edit-task">Edit</button>
              <button type="button" class="btn btn-outline-danger delete-task">Delete</button>
              <button type="button" class="btn btn-outline-secondary share-task">Share</button>
              <button type="button" class="btn btn-primary d-none save-edit">Save Changes</button>
              <button type="button" class="btn btn-secondary d-none cancel-edit">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  addEventListeners(modalId) {
    const deleteButton = this.querySelector('.delete-task');
    const shareButton = this.querySelector('.share-task');
    const editButton = this.querySelector('.edit-task');
    const saveEditButton = this.querySelector('.save-edit');
    const cancelEditButton = this.querySelector('.cancel-edit');
    const viewMode = this.querySelector('.view-mode');
    const editMode = this.querySelector('.edit-mode');

    if (deleteButton) {
      deleteButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this task?')) {
          const taskKey = this.getAttribute('data-key');
          if (taskKey) {
            localStorage.removeItem(taskKey);
            console.log(`Task with key ${taskKey} deleted.`);
            document.querySelector(`#${modalId}`).remove();
          } else {
            console.error('No data-key found to delete task.');
          }
        }
      });
    }

    if (shareButton && navigator.share) {
      shareButton.addEventListener('click', () => {
        navigator.share({
          title: this.getAttribute('title'),
          text: this.getAttribute('description'),
          url: window.location.href,
        })
        .then(() => alert('Task shared successfully!'))
        .catch(error => alert(`Error sharing task: ${error}`));
      });
    }

    // Edit button: switch to edit mode
    editButton.addEventListener('click', () => {
      viewMode.classList.add('d-none');
      editMode.classList.remove('d-none');
      editButton.classList.add('d-none');
      deleteButton.classList.add('d-none');
      shareButton.classList.add('d-none');
      saveEditButton.classList.remove('d-none');
      cancelEditButton.classList.remove('d-none');
    });

    // Save Changes button: save updates and switch back to view mode
    saveEditButton.addEventListener('click', () => {
      const newTitle = this.querySelector('#editTitle').value;
      const newDescription = this.querySelector('#editDescription').value;

      // Update component attributes
      this.setAttribute('title', newTitle);
      this.setAttribute('description', newDescription);

      // Update modal title and description
      this.querySelector('.modal-title').innerText = newTitle;
      this.querySelector('.description').innerText = newDescription;

      // Switch back to view mode
      viewMode.classList.remove('d-none');
      editMode.classList.add('d-none');
      editButton.classList.remove('d-none');
      deleteButton.classList.remove('d-none');
      shareButton.classList.remove('d-none');
      saveEditButton.classList.add('d-none');
      cancelEditButton.classList.add('d-none');
    });

    // Cancel button: revert to view mode without saving changes
    cancelEditButton.addEventListener('click', () => {
      viewMode.classList.remove('d-none');
      editMode.classList.add('d-none');
      editButton.classList.remove('d-none');
      deleteButton.classList.remove('d-none');
      shareButton.classList.remove('d-none');
      saveEditButton.classList.add('d-none');
      cancelEditButton.classList.add('d-none');
    });
  }
}

customElements.define('task-sticker-xl', TaskStickerXL);
