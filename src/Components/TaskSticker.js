class TaskSticker extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const title = this.getAttribute('title');
    const description = this.getAttribute('description') || 'Please, remember to write a task description.';
    const postItColour = this.getAttribute('postItColour');
    const dueDate = this.getAttribute('dueDate') || 'No date assigned.';
    this.render(title, description, postItColour, dueDate);
    this.addEventListeners();
  }

  render(title, description, postItColour, dueDate) {
    this.innerHTML = `
      <!-- Post-it structure using Bootstrap -->
      <div class="post-it card text-dark shadow-sm mb-2" style="background-color: ${postItColour};">
        <div class="card-body p-2">
          <!-- Only the title will be visible on the board -->
          <h5 class="card-title m-0">${title}</h5>
        </div>
      </div>
  
      <!-- Bootstrap Modal Structure -->
      <div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content" style="background-color: ${postItColour};">
            <div class="modal-header">
              <h5 class="modal-title font-weight-bold">${title}</h5>
              <button type="button" class="close modal-close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>${description}</p>
              <p><strong>Date due:</strong> ${dueDate}</p>
            </div>
            <div class="modal-footer justify-content-between">
              <div>
                <button type="button" class="btn btn-light delete-task">
                  <i class="bi bi-trash"></i> Delete
                </button>
                <button type="button" class="btn btn-light share-task">
                  <i class="bi bi-share"></i> Share
                </button>
                <button type="button" class="btn btn-light archive-task">
                  <i class="bi bi-archive"></i> Archive
                </button>
              </div>
              <button type="button" class="btn btn-secondary modal-close">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  addEventListeners() {
    const taskSticker = this.querySelector('.post-it');
    const modal = this.querySelector('.modal');
    const closeButton = this.querySelectorAll('.modal-close'); // Selecting all close buttons (header and footer)
    const deleteButton = this.querySelector('.delete-task');
    const shareButton = this.querySelector('.share-task');
    const archiveButton = this.querySelector('.archive-task');

    // Open the modal when clicking on the post-it
    taskSticker.addEventListener('click', () => {
      $(modal).modal('show');
    });

    // Close modal on click of close buttons
    closeButton.forEach(button => {
      button.addEventListener('click', () => {
        $(modal).modal('hide');
      });
    });

    // Delete task button
    deleteButton.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this task?')) {
        this.remove();
        $(modal).modal('hide');
      }
    });

    // Archive task button (hides for now)
    archiveButton.addEventListener('click', () => {
      if (confirm('Are you sure you want to archive this task?')) {
        taskSticker.style.display = 'none'; // The idea is to move this to an archive folder eventually
        $(modal).modal('hide');
      }
    });

    // Share task button
    shareButton.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: this.getAttribute('title'),
          text: this.getAttribute('description'),
          url: window.location.href,
        })
        .then(() => {
          alert('Task shared successfully!');
        })
        .catch((error) => {
          alert(`Error sharing task: ${error}`);
        });
      } else {
        alert('Your browser does not support sharing tasks.');
      }
    });
  }
}

customElements.define('task-sticker', TaskSticker);
