class TaskStickerController extends HTMLElement {
    constructor() {
        super();
        this.expanded = false; // Initial state is 'small'
        this.isToggling = false; // Debounce state
        this.observer = new MutationObserver(() => {
            if (this.expanded) {
                this.render();
            }
        });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        // Clear current content and disconnect the observer to avoid redundant calls
        this.observer.disconnect();
        this.innerHTML = '';

        this.style.cursor = 'pointer';

        // Render either TaskSticker or TaskStickerXL based on the `expanded` state
        const elementHTML = this.expanded
            ? `<task-sticker-xl data-key="${this.getAttribute('data-key')}"
                  title="${this.getAttribute('title')}"
                  description="${this.getAttribute('description')}"
                  postItColour="${this.getAttribute('postItColour')}"
                  dueDate="${this.getAttribute('dueDate')}"></task-sticker-xl>`
            : `<task-sticker data-key="${this.getAttribute('data-key')}"
                  title="${this.getAttribute('title')}"
                  description="${this.getAttribute('description')}"
                  postItColour="${this.getAttribute('postItColour')}"
                  dueDate="${this.getAttribute('dueDate')}"></task-sticker>`;

        this.insertAdjacentHTML('beforeend', elementHTML);

        // Reconnect observer to watch for new mutations
        this.observer.observe(this, { childList: true, subtree: true });
    }

    addEventListeners() {
        this.addEventListener('click', () => {
            if (!this.isToggling) {
                this.isToggling = true;
                this.expanded = !this.expanded;
                this.render();
                
                setTimeout(() => {
                    this.isToggling = false;
                }, 300);
            }
        });
    }
}

customElements.define('task-sticker-controller', TaskStickerController);
