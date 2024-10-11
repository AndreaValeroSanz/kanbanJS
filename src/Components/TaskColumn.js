class TaskColumn extends HTMLElement {
  constructor() {
    super();
    // Adjuntar el shadow DOM
    this.attachShadow({ mode: "open" });
  }

  // Se llama cuando el elemento se conecta al DOM
  connectedCallback() {
    const title = this.getAttribute("title"); // Obtener el atributo 'title'
    this.render(title); // Llamar al método render y pasar el título
  }

  // Método render para construir el HTML del componente
  render(title) {
    this.shadowRoot.innerHTML = `
        <style>
        .task-column {
            background-color: #f8f8f8;
            border-radius: 8px;
            padding: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: 200px;
            min-height: 300px;
        }
        .task-column h2 {
            font-size: 1.2rem;
            font-weight: 500;
            font-family: "Raleway", sans-serif;
            font-optical-sizing: auto;
            font-style: normal;
        }
        .task-column hr {
            border: 0;
            border-top: 2px solid #dbdbdb;
            margin: 10px 0;
        }
        .task-item {
            /*TODO: los postits*/
        }
        </style>
        <div class="task-column">
            <h2>${title}</h2>
            <hr>
            <div class="task-item"></div>
        </div>
      `;
  }
}

// Definir el nuevo elemento custom
customElements.define("task-column", TaskColumn);
