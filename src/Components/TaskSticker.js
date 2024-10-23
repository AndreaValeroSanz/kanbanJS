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
        width: 18vh;
        height: 18vh;
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

       .btn-task btn{
            border-radius: 50%;
            border: 2px solid #fafafa;
            clip-path:circle(50% at 50% 50%);
            background-color: transparent;
          }

    .btn-task .btn img {
            border-radius: 50%;
            border: 2px solid #fafafa;
        
            background-color: transparent;
          }
            

</style>

<div class="container ">
    <div class="row  ">
        <div class="g-0">
            <div class="card card-margin  background-${postItColour}">
                <div class="card-header no-border d-flex justify-content-end mt-2 ">
                  <div >
                  <svg class="background-${postItColour}" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path transform ="rotate(12,12,12)" d="M12 1.75C9.97274 1.75 7.99103 2.35115 6.30542 3.47743C4.61982 4.60372 3.30601 6.20454 2.53022 8.07748C1.75442 9.95043 1.55147 12.0114 1.94696 13.9997C2.34246 15.988 3.31865 17.8143 4.75214 19.2478C6.18563 20.6813 8.012 21.6575 10.0003 22.053C11.9886 22.4485 14.0495 22.2456 15.9225 21.4698C17.7954 20.694 19.3963 19.3802 20.5226 17.6946C21.6489 16.009 22.25 14.0273 22.25 12C22.2474 9.28234 21.1666 6.67674 19.2449 4.75507C17.3233 2.83339 14.7177 1.75265 12 1.75ZM11 6.75C11 6.48478 11.1054 6.23043 11.2929 6.04289C11.4804 5.85536 11.7348 5.75 12 5.75C12.2652 5.75 12.5196 5.85536 12.7071 6.04289C12.8946 6.23043 13 6.48478 13 6.75V13.08C13 13.3452 12.8946 13.5996 12.7071 13.7871C12.5196 13.9746 12.2652 14.08 12 14.08C11.7348 14.08 11.4804 13.9746 11.2929 13.7871C11.1054 13.5996 11 13.3452 11 13.08V6.75ZM12 17.83C11.7528 17.83 11.5111 17.7567 11.3055 17.6193C11.1 17.482 10.9398 17.2868 10.8452 17.0583C10.7505 16.8299 10.7258 16.5786 10.7741 16.3361C10.8223 16.0937 10.9413 15.8709 11.1162 15.6961C11.291 15.5213 11.5137 15.4022 11.7562 15.354C11.9986 15.3058 12.2499 15.3305 12.4783 15.4251C12.7067 15.5197 12.902 15.68 13.0394 15.8855C13.1767 16.0911 13.25 16.3328 13.25 16.58C13.2475 16.902 13.1198 17.2104 12.894 17.44C12.6682 17.6695 12.3619 17.8022 12.04 17.81L12 17.83Z" fill="red" />
                  </svg>

                  </div>
                </div>
                <div class="card-body d-flex pt-0 g-0 p-0 mx-2 row background-${postItColour}">
                  <h5 class="card-title bg-transparent text-center">${title}</h5>
                               
                            <div class="bg-transparent d-flex  align-self-center ">
                                <span class=" d-flex align-self-end background-${postItColour}">${dueDate}</span>
                          

                               
                            <div class="btn-task bg-transparent d-flex justify-content-end pe-1 pb-1" role="group" aria-label="Collaborators icons">
                                        <button type="button" class="btn background-${postItColour}">
                                            <img src="https://placehold.co/40x40"></img>
                                    </button>
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

// Define custom element
customElements.define('task-sticker', TaskSticker);
