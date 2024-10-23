class TaskColumn extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const title = this.getAttribute("title");
    const taskIcon = this.getAttribute("taskIcon");
  
    // Get the slotted content
    const slotContent = this.querySelector('[slot="content"]');
  
    // Minimal rendering changes to prevent overwriting the slot content
    this.innerHTML = `
      <style>
        .task-column {
          border-radius: 8px;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
          background-color: #F8F8F8;
          padding: 10px;
          width: 200px;
          min-height: 300px;
          height: 90vh;
          border: 1px solid #dbdbdb;
          box-sizing: border-box;
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

        .btn-new-task {
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
        }

        .btn-new-task:hover {
          opacity: 0.8;
        }
      </style>
  
      <div class="task-column">
        <div class="task-icon-new-task">
          <div class="icon-container">
            ${taskIcon ? `<img src="${taskIcon}" alt="task-icon" class="icon"/>` : ""}
          </div>
          <button type="button" id="openModalButton" class="btn-new-task" aria-label="Open new task modal">
            <!-- SVG code here -->
          </button>
        </div>
  
        <h2>${title}</h2>
        <hr>
  
        <!-- Include the slotted content -->
        ${slotContent ? slotContent.outerHTML : ''}
      </div>
    `;
  
    // Event listener for modal button
    this.querySelector('#openModalButton').addEventListener('click', () => {
      const event = new CustomEvent('openTaskModal', { detail: { columnTitle: title } });
      window.dispatchEvent(event);
    });
  }
}

// Define the custom element without Shadow DOM
customElements.define('task-column', TaskColumn);
