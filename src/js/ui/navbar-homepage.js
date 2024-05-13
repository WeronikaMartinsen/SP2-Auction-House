document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar-custom")
  navbar.innerHTML = `
    <div class="container-fluid custom-height-pre-navbar bg-dark d-flex justify-content-end align-items-center">
    </div>
    <nav class="navbar bg-light">
      <div class="navbar-logo">
        <a href="#" id="profile-logo">
          <img src="/images/logo-bidme.png" alt="Logo of the website - Bidme." class="custom-logo-size-feed">
        </a>
      </div>
      <div class="navbar-toggler">
        <i class="fa-solid fa-bars"></i>
      </div>
      <div class="navbar-additional-content bg-light" id="navbarAdditionalContent">
        <div class="navbar-content-item d-flex flex-column">
          <a href="#" id="name-navbar" class="text-primary text-end"></a>
          <span id="credits-navbar" class="text-dark text-end"></span>
        </div>
       
        <div class="d-flex">  
        <div class="navbar-content-item custom-padding-logout-btn">
    <a href="/html/login/index.html" id="logout" class="btn btn-primary rounded-4 text-white px-4 shadow-sm">Log in</a>
  </div>
  <div class="navbar-content-item custom-padding-logout-btn">
    <a href="/html/register/register.html" id="logout" class="btn btn-light rounded-4 text-dark border border-dark px-4 shadow-sm">Register</a>
  </div></div>
      </div>
    </nav>
  `

  const navbarToggle = document.querySelector(".navbar-toggler")
  navbarToggle.addEventListener("click", () => {
    const navbarAdditionalContent = document.querySelector(
      "#navbarAdditionalContent",
    )
    if (navbarAdditionalContent.style.display === "block") {
      navbarAdditionalContent.style.display = "none"
    } else {
      navbarAdditionalContent.style.display = "block"
    }
  })
})
