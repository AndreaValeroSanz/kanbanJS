class TaskColumn extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const title = this.getAttribute("title");
    const taskIcon = this.getAttribute("taskIcon");
    this.render(title, taskIcon);
  }

  render(title, taskIcon) {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          border-radius: 8px;
          box-shadow: -15px 15px 0px 0px rgba(219, 219, 219, 1);
        }

        .task-column {
          background-color: #F8F8F8;
          border-radius: 8px;
          padding: 10px;
          width: 200px;
          min-height: 300px;
          height: 90vh;
          border: 1px solid #dbdbdb;
        }
        .task-icon-new-task {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .task-column h2 {
          font-size: 1.2rem;
          font-weight: 500;
        }

        .task-column hr {
          border: 0;
          border-top: 2px solid #dbdbdb;
          margin: 10px 0;
        }

        .task-column svg {
          width: 40px;
          height: 40px;
          margin-bottom: 10px;
        }
      </style>

      <div class="task-column">
        <div class="task-icon-new-task">
          <div class="icon-container">
            ${taskIcon ? `<img src="${taskIcon}" alt="task-icon" class="icon"/>` : ""}
          </div>
          <button type="button" id="openModalButton" class="btn-new-task">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" style="color: #5030e5" viewBox="0 0 32 32">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
          </button>
        </div>

        <h2>${title}</h2>
        <hr>
        <div class="task-item"></div>
      </div>
    `;

    // Use shadowRoot to access elements inside shadow DOM
    this.shadowRoot.querySelector('#openModalButton').addEventListener('click', () => {
      const event = new CustomEvent('openTaskModal');
      window.dispatchEvent(event); // Dispatch the event globally to open the modal
    });
  }
}

// Define custom element
customElements.define("task-column", TaskColumn);
