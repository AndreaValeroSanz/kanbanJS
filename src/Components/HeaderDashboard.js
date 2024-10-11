class Header extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <div>
          <div class="row pt-5">
            <div class="col-lg-2">
              <div class="d-flex justify-content-center">
                <h1>Dashboard </h1>
              </div>
            </div>
            <div class="col-lg-10 d-flex justify-content-end">
              invite
            </div>
          </div>
  
          <div>
            <div class="">
              <ul class="list-unstyled d-flex justify-content-end">
                <li class="py-1 ps-3">
                  <button type="button" class=" p-0 border-0">
                    <i class="bi bi-circle-fill pe-2" style="color: #4da167;"></i>
                    MobileApp
                  </button>
                </li>
  
                <li class="py-1 ps-3">
                  <button type="button" class=" p-0 border-0">
                    <i class="bi bi-circle-fill pe-2" style="color: #2589bd;"></i>
                    MobileApp
                  </button>
                </li>
  
                <li class="py-1 ps-3">
                  <button type="button" class=" p-0 border-0">
                    <i class="bi bi-circle-fill pe-2" style="color: #f5bb00;"></i>
                    MobileApp
                  </button>
                </li>
  
                <li class="py-1 ps-3">
                  <button type="button" class=" p-0 border-0">
                    <i class="bi bi-circle-fill pe-2" style="color: #ed98b4;"></i>
                    MobileApp
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>`;
    }
  }
  
  customElements.define("my-header", Header);
  