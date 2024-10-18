class AddTask extends HTMLElement {
  constructor() {
    super();
    // Elimina o comenta esta línea para no usar shadow DOM
    // this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.innerHTML = `
       <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >icono mas</button>
  
    
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" style="display: none;" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Task Title</h1>
           
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>           
          </div>     
          
      
          <div class="modal-body">
            <p> Task Title*</p> 
          <input type="text" class="form-control" id="message-text" required>
            <form>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Task's Description:</label>
                <textarea type="text" class="form-control" id="message-text" rows=7></textarea> 
              </div>
              <div class="mb-3">
                <p> Deadline</p>
                <input type="date" id="recipient-te">
              </div>
              <style> .row: after{content:""; display: table; clear: both;}</style>
              <div class="row"> <style>.column{ float: left; width: 50%;}</style>
                <div class="col" >   
                  <p>Select workarea </p>  
                      <div class="form-check">
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                      <label class="form-check-label" for="flexRadioDefault1">
                        Front
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                      <label class="form-check-label" for="flexRadioDefault2">
                        Back
                      </label>                  
                    </div> 
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                      <label class="form-check-label" for="flexRadioDefault2">
                      Server
                      </label>                  
                    </div> 
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                    <label class="form-check-label" for="flexRadioDefault2">
                    Testing
                    </label>                  
                  </div>          
                </div>
                <div class="col " style="height: 200px;">      
                  <p>Assigned Task Collaborators </p> 
                  <div class="col " style="height: 80px;">
                  <div class="d-flex justify-content-around"><i class="bi bi-person-circle"></i> <p>User1 </p><button type="button"   class="btn btn-primary btn-sm">add</button>
                  </div>
                  
                  <div class="d-flex justify-content-around"><i class="bi bi-person-circle"></i> <p>User2 </p><button type="button"   class="btn btn-primary btn-sm">add</button>
                  </div>
                  <div class="d-flex justify-content-around"><i class="bi bi-person-circle"></i> <p>User3 </p><button type="button"   class="btn btn-primary btn-sm">add</button>
                  </div>
                  <div class=" d-flex justify-content-end">
                  <button type="button" class="btn btn-link">add more...</button>  
                  </div>
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
    
      
 
  </body>
    `;
  }
}

customElements.define("add-task", AddTask);
