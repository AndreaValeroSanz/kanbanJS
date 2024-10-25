class TaskStickerXL extends HTMLElement {
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
      <style>
          .card-margin { margin-bottom: 1.875rem; }
          .card { border: 0; box-shadow: 0px 0px 10px rgba(82, 63, 105, 0.1); position: absolute; display: flex; flex-direction: column; min-width: 0; background-clip: border-box; border: 1px solid #e6e4e9; border-radius: 8px; width: 50vh; height: 50vh; top: 50%; left: 50%; }
          .card .card-header.no-border { border: 0; }
          .card .card-header { background: none; padding: 0 0.9375rem; font-weight: 500; display: flex; align-items: center; min-height: 50px; }
          .background-yellow { background-color: #fadd80; }
      </style>

      <div class="container">
          <div class="row">
              <div class="col-lg-4 g-0">
                  <div class="card card-margin background-${postItColour}">
                      <div class="card-header no-border pt-4 d-flex justify-content-center">
                          <div class="position-absolute top-0 end-0">
                              <svg width="24" height="24" viewBox="0 0 24 24"><path d="M19 5L5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M19 19L5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                          </div>
                          <h5 class="card-title">${title}</h5>
                      </div>
                      <div class="card-body d-flex pt-0 g-0 p-0 mx-2 background-${postItColour}">
                          <div>
                              <div class="d-flex align-items-center mx-1 background-${postItColour}">
                                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 1.75C9.97 1.75 7.99 2.35 6.3 3.48C4.62 4.6 3.3 6.2 2.53 8.08C1.75 9.95 1.55 12 1.95 14C2.34 16 3.32 17.81 4.75 19.25C6.19 20.68 8.01 21.66 10 22.05C12 22.44 14.05 22.24 15.92 21.47C17.8 20.69 19.4 19.38 20.52 17.69C21.65 16 22.25 14.03 22.25 12C22.25 9.28 21.17 6.68 19.24 4.75C17.32 2.83 14.72 1.75 12 1.75Z" fill="red"/></svg>
                                  <span class="ms-1">${dueDate}</span>
                              </div>
                              <ol class="p-0 pt-3 background-${postItColour}">
                                  <li class="bg-transparent"><span>${description}</span></li>
                              </ol>
                          </div>
                      </div>
                      <div class="modal-footer d-flex justify-content-between">
                          <button type="button" class="btn btn-sm delete-task">Delete</button>
                          <button type="button" class="btn btn-sm share-task">Share</button>
                          <button type="button" class="btn btn-sm archive-task">Archive</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>`;
  }

  addEventListeners() {
      const taskSticker = this.querySelector(`.background-${this.getAttribute('postItColour')}`);
      const deleteButton = this.querySelector('.delete-task');
      const shareButton = this.querySelector('.share-task');
      const archiveButton = this.querySelector('.archive-task');

      // Open modal functionality (if necessary)
      if (taskSticker) {
          taskSticker.addEventListener('click', () => {
              const modal = this.querySelector('.modal');
              if (modal) modal.style.display = 'block';
          });
      }

      // Delete task button
      if (deleteButton) {
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this task?')) {
                // Obtener la clave de la tarea del atributo 'data-key'
                const taskKey = this.getAttribute('data-key');

                // Eliminar del localStorage usando la clave
                if (taskKey) {
                    localStorage.removeItem(taskKey);
                    console.log(`Tarea con clave ${taskKey} eliminada.`);

                    // Eliminar el elemento del DOM
                    this.remove();
                    toggleButton.addEventListener('click', () => {
                      element.classList.toggle('hidden');
                      setTimeout(() => {
                        window.location.reload(true);  // Refresca la página después de la eliminación
                    }, 200);
                       // Alternar la clase 'hidden'
                  });
                } else {
                    console.error('No se encontró el atributo data-key para eliminar la tarea.');
                }
                
            }
        });
    }


      // Archive task button
      if (archiveButton) {
          archiveButton.addEventListener('click', () => {
              if (confirm('Are you sure you want to archive this task?')) {
                  taskSticker.style.display = 'none';
              }
          });
      }

      // Share task button
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
  }
}

customElements.define('task-sticker-xl', TaskStickerXL);
