class AddTask extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Ensure AddTask listens for the custom event
    window.addEventListener('openTaskModal', () => {
      const modal = new bootstrap.Modal(this.querySelector('#exampleModal'), {});
      modal.show();
    });

    // Modal HTML structure
    this.innerHTML = `
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Task Title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Task Title*</p>
              <input type="text" class="form-control" id="task-title" required>
              <form>
                <div class="mb-3">
                  <label for="task-desc" class="col-form-label">Task's Description:</label>
                  <textarea type="text" class="form-control" id="task-desc" rows="7"></textarea>
                </div>
                <div class="mb-3">
                  <p>Deadline</p>
                  <input type="date" id="task-deadline">
                </div>
                <div class="row">
                  <div class="col">
                    <p>Select work area</p>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="workarea" id="workarea1" value="Front">
                      <label class="form-check-label" for="workarea1">Front</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="workarea" id="workarea2" value="Back">
                      <label class="form-check-label" for="workarea2">Back</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="workarea" id="workarea3" value="Server">
                      <label class="form-check-label" for="workarea3">Server</label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">Create task</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('add-task', AddTask);
