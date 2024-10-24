window.dragInit = function () {
    const columns = [
        document.querySelector('#on-hold [slot="content"]'),
        document.querySelector('#not-started [slot="content"]'),
        document.querySelector('#in-progress [slot="content"]'),
        document.querySelector('#review-ready [slot="content"]'),
        document.querySelector('#done [slot="content"]')
    ];

    // Add placeholders for empty columns
    columns.forEach(column => {
        checkForEmptyColumn(column);
    });

    // Initialize Dragula
    const drake = dragula(columns, {
        moves: function (el, container, handle) {
            return el.classList.contains('drag');
        }
    });

    // Event: After an item is dropped
    drake.on('drop', function(el, target, source, sibling) {
        checkForEmptyColumn(source); // Check source column after item is removed
        checkForEmptyColumn(target); // Check target column after item is added
    });
};

// Function to add/remove placeholder based on column content
function checkForEmptyColumn(column) {
    if (!column.querySelector('.drag')) {
        // Add placeholder if no items exist
        if (!column.querySelector('.placeholder')) {
            const placeholder = document.createElement('div');
            placeholder.style.cssText = 'background-color: #F8F8F8; width: 18vh;';
            placeholder.classList.add('placeholder');
            placeholder.innerHTML = '<p>Drop items here</p>';
            column.appendChild(placeholder);
        }
    } else {
        // Remove placeholder if items are present
        const placeholder = column.querySelector('.placeholder');
        if (placeholder) {
            column.removeChild(placeholder);
        }
    }
}
