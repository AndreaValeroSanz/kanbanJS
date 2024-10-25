class TaskStickerController extends HTMLElement {
    constructor() {
        super();
        this.expanded = false; // Initial state is 'small'
        this.isToggling = false; // Debounce state
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        // Clear current content
        this.innerHTML = '';

        // Add a cursor style to indicate the card is clickable
        this.style.cursor = 'pointer';

        // Render either TaskSticker or TaskStickerXL based on the `expanded` state
        if (this.expanded) {
            this.innerHTML = `<task-sticker-xl title="${this.getAttribute('title')}"
                                              description="${this.getAttribute('description')}"
                                              postItColour="${this.getAttribute('postItColour')}"
                                              dueDate="${this.getAttribute('dueDate')}"></task-sticker-xl>`;
        } else {
            this.innerHTML = `<task-sticker title="${this.getAttribute('title')}"
                                            description="${this.getAttribute('description')}"
                                            postItColour="${this.getAttribute('postItColour')}"
                                            dueDate="${this.getAttribute('dueDate')}"></task-sticker>`;
        }
    }

    addEventListeners() {
        this.addEventListener('click', () => {
            if (!this.isToggling) { // Check debounce state
                this.isToggling = true; // Prevent immediate retrigger
                this.expanded = !this.expanded; // Toggle state
                this.render(); // Re-render based on the new state
                
                // Reset debounce state after 300ms to allow another toggle
                setTimeout(() => {
                    this.isToggling = false;
                }, 300);
            }
        });
    }
}

// Define the custom element for the controller
customElements.define('task-sticker-controller', TaskStickerController);
