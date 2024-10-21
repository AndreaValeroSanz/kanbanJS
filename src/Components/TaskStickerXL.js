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
  <style>
      .card-margin {
          margin-bottom: 1.875rem;
      }
  
      .card {
          border: 0;
          box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
          -webkit-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
          -moz-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
          -ms-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
      }
  
      .card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-width: 0;
          word-wrap: break-word;
          background-clip: border-box;
          border: 1px solid #e6e4e9;
          border-radius: 8px;
          width: 20vh;
          height: 20vh;
      }
  
      .card .card-header.no-border {
          border: 0;
      }
  
      .card .card-header {
          background: none;
          padding: 0 0.9375rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          min-height: 50px;
      }
  
      .card-header:first-child {
          border-radius: calc(8px - 1px) calc(8px - 1px) 0 0;
      }
        
      .background-yellow {
        background-color: #fadd80;
      }
  </style>
  
  <div class="container">
      <div class="row">
          <div class="col-lg-4 g-0">
              <div class="card card-margin background-${postItColour}">
                  <div class="card-header no-border pt-5 justify-content-center">
                      <h5 class="card-title bg-transparent">${title}</h5>
                  </div>
                  <div class="card-body d-flex pt-0 g-0 p-0  background-${postItColour}">
                      <ol class="p-0 pt-3 background-${postItColour}">
                            <li class="bg-transparent">
                                <span class="background-${postItColour}">${description}</span>
                            </li>
                        </ol>
                      <div class="bg-transparent">
                          <div class=" background-${postItColour}">
                              <div class="bg-transparent">
                                  <span class="background-${postItColour}">${dueDate}</span>
                              </div>
                          </div>
                          
                      </div>
                  </div>
                      <div class="d-flex justify-content-end bg-transparent">
                          <div class="bg-transparent d-flex justify-content-end">
                              <a href="#" class="btn btn-sm btn-flash-border-primary background-${postItColour}">View All</a>
                          </div>
                      </div>
                       
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
  