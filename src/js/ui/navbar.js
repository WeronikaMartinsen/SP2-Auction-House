document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar-custom")
  navbar.innerHTML = `
    <div class="container-fluid custom-height-pre-navbar bg-dark"></div>
    <header class="bg-light sticky-top">
      <nav class="navbar navbar-expand-sm text-white">
        <div class="container-fluid d-flex align-items-center">
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
      <div class="float-left">
        <a class="navbar-brand" href="listings.html">
          <img
            class="custom-logo-size-feed"
            src="/images/logo-bidme.png"
            alt="Logo of the website - Bidme."
          />
        </a>
      </div>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav me-auto mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="listings.html">Auctions</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">My auctions</a>
          </li>
        </ul>
      </div>
      <div>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              <img
                class="custom-avatar-size"
                src="/images/avatar-bidme.png"
                alt="Logo of the website - Bidme."
              />
            </a>
          </li>
        </ul>
      </div>
        </div>
      </nav>
    </header>
  `
})
