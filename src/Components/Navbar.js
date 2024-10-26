class navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <nav class="navbar p-0 m-0">
        <div class=" w-100 d-flex justify-content-between">
          
        <div class="container ">

            <div class="bg-gray rounded-3 w-25 px-2">
              <i class="bi bi-search bg-transparent"></i>
              <input
                type="text"
                class="border-0 bg-transparent px-2"
                placeholder="Search for anything..."
              />
            </div>
      </div>

          <div>
            <button type="button" class="btn d-flex align-items-center p-0">
            <span>User</span>
            <span class="px-3">
                <i class="bi bi-person"></i>
             </span>
            </button>
         </div>


        </div>
      </nav>
        
        `;
  }
}

// Define custom element
customElements.define("my-navbar", navbar);
