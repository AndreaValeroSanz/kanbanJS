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
          width: 60vh;
          height: 60vh;
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
    .btn-task .btn img {
                border-radius: 50%;
                border: 2px solid #fafafa;
                clip-path:circle(50% at 50% 50%);
                background-color: transparent;
            }
            
     
      
  </style>
  
  <div class="container">
      <div class="row">
      
          <div class="col-lg-4 g-0">
              <div class="card card-margin background-${postItColour}">
                  <div class="card-header no-border pt-4 d-flex justify-content-center position relative">
                  <div class="position-absolute top-0 end-0 ">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 5L5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19 19L5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                  </div d-flex justify-content-center>
                      <h5 class="card-title bg-transparent">${title}</h5>
                  </div>
                  <div class="card-body d-flex pt-0 g-0 p-0 mx-2  background-${postItColour}">
                      
                      <div class="background-${postItColour}">
                          <div class=" background-${postItColour}">
                              <div class=" d-flex align-items-center mx-1  background-${postItColour}" >
                                    <div class="background-${postItColour}" >
                                    <svg class="background-${postItColour}" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path transform ="rotate(12,12,12)" d="M12 1.75C9.97274 1.75 7.99103 2.35115 6.30542 3.47743C4.61982 4.60372 3.30601 6.20454 2.53022 8.07748C1.75442 9.95043 1.55147 12.0114 1.94696 13.9997C2.34246 15.988 3.31865 17.8143 4.75214 19.2478C6.18563 20.6813 8.012 21.6575 10.0003 22.053C11.9886 22.4485 14.0495 22.2456 15.9225 21.4698C17.7954 20.694 19.3963 19.3802 20.5226 17.6946C21.6489 16.009 22.25 14.0273 22.25 12C22.2474 9.28234 21.1666 6.67674 19.2449 4.75507C17.3233 2.83339 14.7177 1.75265 12 1.75ZM11 6.75C11 6.48478 11.1054 6.23043 11.2929 6.04289C11.4804 5.85536 11.7348 5.75 12 5.75C12.2652 5.75 12.5196 5.85536 12.7071 6.04289C12.8946 6.23043 13 6.48478 13 6.75V13.08C13 13.3452 12.8946 13.5996 12.7071 13.7871C12.5196 13.9746 12.2652 14.08 12 14.08C11.7348 14.08 11.4804 13.9746 11.2929 13.7871C11.1054 13.5996 11 13.3452 11 13.08V6.75ZM12 17.83C11.7528 17.83 11.5111 17.7567 11.3055 17.6193C11.1 17.482 10.9398 17.2868 10.8452 17.0583C10.7505 16.8299 10.7258 16.5786 10.7741 16.3361C10.8223 16.0937 10.9413 15.8709 11.1162 15.6961C11.291 15.5213 11.5137 15.4022 11.7562 15.354C11.9986 15.3058 12.2499 15.3305 12.4783 15.4251C12.7067 15.5197 12.902 15.68 13.0394 15.8855C13.1767 16.0911 13.25 16.3328 13.25 16.58C13.2475 16.902 13.1198 17.2104 12.894 17.44C12.6682 17.6695 12.3619 17.8022 12.04 17.81L12 17.83Z" fill="red" />
                                    </svg>

                                    </div>
                                  <span class=" ms-1 background-${postItColour}">${dueDate}</span>
                              </div>
                          </div>
                          <ol class="p-0 pt-3 background-${postItColour}">
                            <li class="bg-transparent">
                                <span class="background-${postItColour}">${description}</span>
                            </li>
                        </ol>
                      </div>
                  </div>
                    <div class="modal-footer background-${postItColour}d-flex justify-content-between">

                    <div class="acciones_usuario">
                            <div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.47058 6.01471V18.5294C5.47058 19.251 5.75721 19.943 6.26742 20.4532C6.77763 20.9634 7.46962 21.25 8.19117 21.25H15.8088C16.5304 21.25 17.2224 20.9634 17.7326 20.4532C18.2428 19.943 18.5294 19.251 18.5294 18.5294V6.01471" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M3.29413 6.01471H20.7059" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8.73529 6.01471V4.38235C8.73529 3.94943 8.90727 3.53423 9.2134 3.2281C9.51952 2.92198 9.93472 2.75 10.3676 2.75H13.6323C14.0653 2.75 14.4805 2.92198 14.7866 3.2281C15.0927 3.53423 15.2647 3.94943 15.2647 4.38235V6.01471" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9.82352 16.9915V11.5535" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14.1765 16.9915V11.5535" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                                <button type="button" class="btn btn-sm btn-flash-border-primary background-${postItColour}" data-bs-dismiss="modal">Delete</button>
                            </div>
                            <div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.01472 15.8088C7.81776 15.8088 9.27942 14.3472 9.27942 12.5441C9.27942 10.7411 7.81776 9.27942 6.01472 9.27942C4.21167 9.27942 2.75001 10.7411 2.75001 12.5441C2.75001 14.3472 4.21167 15.8088 6.01472 15.8088Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M17.9853 9.27941C19.7883 9.27941 21.25 7.81775 21.25 6.01471C21.25 4.21166 19.7883 2.75 17.9853 2.75C16.1822 2.75 14.7206 4.21166 14.7206 6.01471C14.7206 7.81775 16.1822 9.27941 17.9853 9.27941Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M17.9853 21.25C19.7883 21.25 21.25 19.7883 21.25 17.9853C21.25 16.1822 19.7883 14.7206 17.9853 14.7206C16.1822 14.7206 14.7206 16.1822 14.7206 17.9853C14.7206 19.7883 16.1822 21.25 17.9853 21.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15.0144 16.6359L8.9856 13.8935" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15.1124 7.58176L8.88765 10.9771" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                                <button type="button" class="btn btn-sm btn-flash-border-primary background-${postItColour}" data-bs-dismiss="modal">Share</button>
                            </div>
                            <div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.38232 8.8125V17.3125C4.38232 18.1579 4.72628 18.9686 5.33853 19.5664C5.95079 20.1642 6.78118 20.5 7.64703 20.5H16.3529C17.2188 20.5 18.0492 20.1642 18.6614 19.5664C19.2737 18.9686 19.6176 18.1579 19.6176 17.3125V8.8125" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M19.6176 3.5H4.38235C3.48083 3.5 2.75 4.21355 2.75 5.09375V7.21875C2.75 8.09895 3.48083 8.8125 4.38235 8.8125H19.6176C20.5192 8.8125 21.25 8.09895 21.25 7.21875V5.09375C21.25 4.21355 20.5192 3.5 19.6176 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12.0001 17L12.0001 12" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
                            <path d="M9.70709 14.895L11.6744 16.8624C11.717 16.9053 11.7678 16.9395 11.8237 16.9627C11.8795 16.986 11.9395 16.998 12 16.998C12.0605 16.998 12.1205 16.986 12.1764 16.9627C12.2323 16.9395 12.283 16.9053 12.3256 16.8624L14.2929 14.895" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                                <button type="button" class="btn btn-sm btn-flash-border-primary background-${postItColour}" data-bs-dismiss="modal">Archive</button>
                            </div>


                    <div class="usuario">   
                            <div class="d-flex justify-content-end bg-transparent">
                                <div class="bg-transparent d-flex justify-content-end">
                                    <a href="#" class="btn btn-sm btn-flash-border-primary background-${postItColour}">View All</a>
                            <div class="btn-taks bg-transparent d-flex justify-content-end pe-1 pb-1" role="group" aria-label="Collaborators icons">
                                        <button type="button" class="btn btn-outline-primary">
                                            <img src="https://placehold.co/40x40"></img>
                                    </button>
                                </div> 
                            </div>       
                        </div>
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
  