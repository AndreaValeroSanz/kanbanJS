class TaskSticker extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const attributes = this.getAttributes();
    this.setUniqueIdentifiers(attributes);
    this.render(attributes);
    this.addEventListeners(attributes.modalId, attributes.dataKey);
  }

  getAttributes() {
    return {
      title: this.getAttribute('title') || 'Untitled Task',
      description: this.getAttribute('description') || 'Please, remember to write a task description.',
      postItColour: this.getAttribute('postItColour'),
      dueDate: this.getAttribute('dueDate') || 'No date assigned.',
      workarea: this.getAttribute('workarea') || '',
      dataKey: this.getAttribute('data-key') || `task-${Math.floor(Math.random() * 10000)}`,
      modalId: `taskModal-${Math.floor(Math.random() * 10000)}`,
    };
  }

  setUniqueIdentifiers(attributes) {
    this.setAttribute('data-key', attributes.dataKey);
    this.setAttribute('data-modal-id', attributes.modalId);
    console.log("Initializing TaskSticker with dataKey:", attributes.dataKey);
  }

  render(attributes) {
    const selectedWorkareas = attributes.workarea.split(',');
    this.innerHTML = `
      <style>${this.getStyles()}</style>
      ${this.getCardHTML(attributes)}
      ${this.getModalHTML(attributes, selectedWorkareas)}
    `;
  }

  getStyles() {
    return `
      .background-yellow { background-color: #fadd80; }
      .background-blue { background-color: #92c4de; }
      .background-pink { background-color: #ed98b4; }
      .background-green { background-color: #a6d0b3; }
    `;
  }

  getCardHTML({ title, dueDate, postItColour, modalId }) {
    return `
      <div class="container">
        <div class="row">
          <div class="card card-margin background-${postItColour}" data-modal-id="${modalId}">
            <div class="card-header no-border d-flex justify-content-end mt-2">
              <div class="bg-transparent">
                <svg class="background-${postItColour}" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="red"/>
                </svg>
              </div>
            </div>
            <div class="card-body d-flex pt-0 g-0 p-0 mx-2 row background-${postItColour}">
              <h5 class="card-title bg-transparent text-center">${title}</h5>
              <div class="bg-transparent d-flex align-self-center">
                <span class="d-flex align-self-end background-${postItColour}">${dueDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getModalHTML({ title, description, dueDate, modalId, postItColour }, selectedWorkareas) {
    return `
      <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content background-${postItColour}">
            <div class="modal-header">
              <input type="text" class="form-control" id="editTitle-${modalId}" placeholder="Task Title" value="${title}">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <input type="text" class="form-control" id="editDueDate-${modalId}" placeholder="Due Date" value="${dueDate}">
              <textarea class="form-control" id="editDescription-${modalId}" rows="3" placeholder="Task Description">${description}</textarea>
              ${this.renderWorkareaOptions(selectedWorkareas, modalId)}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-danger delete-task">Delete</button>
              <button type="button" class="btn btn-primary save-task">Save</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderWorkareaOptions(selectedWorkareas, modalId) {
    return `
      <div class="mb-3">
        <label>Workarea:</label>
        ${['Front', 'Back', 'Server', 'Testing'].map(area => `
          <div class="form-check form-check-inline">
            <input type="checkbox" class="form-check-input workarea-option" id="workarea${area}-${modalId}" value="${area}" ${selectedWorkareas.includes(area) ? 'checked' : ''}>
            <label class="form-check-label" for="workarea${area}-${modalId}">${area}</label>
          </div>
        `).join('')}
      </div>
    `;
  }

  addEventListeners(modalId, dataKey) {
    const card = this.querySelector('.card');
    const modal = this.querySelector(`#${modalId}`);

    if (card && modal) {
      card.addEventListener('click', () => this.showModal(modal));
      modal.querySelector('.save-task').addEventListener('click', () => this.saveTask(dataKey, modalId));
      modal.querySelector('.delete-task').addEventListener('click', () => this.deleteTask(dataKey));
    } else {
      console.error(`Modal element or card element not found. Modal ID: ${modalId}`);
    }
  }

  showModal(modal) {
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modal, { backdrop: 'static', keyboard: false });
    modalInstance.show();
  }

  saveTask(dataKey, modalId) {
    let title = this.getValue(`#editTitle-${modalId}`);
    console.log("Title:", title);

    const dueDate = this.getValue(`#editDueDate-${modalId}`);
    const description = this.getValue(`#editDescription-${modalId}`);
    const workarea = Array.from(this.querySelectorAll('.workarea-option'))
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value)
      .join(',');

    const existingTask = localStorage.getItem(dataKey);
    const [existingTitle, existingDescription, existingDueDate, existingWorkarea] = existingTask ? existingTask.split(';') : [];
    const finalWorkarea = workarea || existingWorkarea;
    console.log("Workarea:", finalWorkarea);

    const taskData = `${title || existingTitle};${description || existingDescription};${dueDate || existingDueDate};${finalWorkarea}`;
    localStorage.setItem(dataKey, taskData);
    console.log("Task updated:", taskData);

    alert('Task updated successfully!');
    window.location.reload();
  }

  deleteTask(dataKey) {
    localStorage.removeItem(dataKey);
    this.remove();
    window.location.reload();
  }

  getValue(selector) {
    const element = this.querySelector(selector);
    return element ? element.value : '';
  }
}

customElements.define('task-sticker', TaskSticker);
