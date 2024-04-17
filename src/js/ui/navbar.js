document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar-custom")
  navbar.innerHTML = `
    <div class="container-fluid custom-height-pre-navbar bg-dark"></div>
    <header class="bg-light sticky-top">
      <nav class="navbar navbar-expand-sm text-white p-0">
        <div class="container-fluid d-flex align-items-center">
          <div class="float-left">
            <a class="navbar-brand" href="#">
              <img
                class="custom-logo-size-feed"
                src="/images/logo-bidme.png"
                alt="Logo of the website - Bidme."
              />
            </a>
          </div>
          
          <button
            class="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="fa-solid fa-bars"></span>
          </button>

          <div class="collapse navbar-collapse justify-content-between align-items-center" id="navbarTogglerDemo02">
            <ul class="navbar-nav mb-lg-0 text-center">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="listings.html">Auctions</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">My auctions</a>
              </li>
            </ul>
          
            <div class="dropdown">
              <a class="dropdown-toggle btn-sm" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                <img
                  class="custom-avatar-size"
                  src="/images/avatar-bidme.png"
                  alt="Avatar."
                />
              </a>
              <div class="dropdown-menu dropdown-menu-dark">
                <a class="dropdown-item" href="profile.html">Profile</a>
                <a class="dropdown-item" href="#">Log out</a>
              </div>
            </div>
            
          </div>
        </div>
      </nav>
    </header>
  `
})
