document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar-custom")

  navbar.innerHTML = `
  <div class="fixed-top shadow-sm">
  <div class="container-fluid custom-height-pre-navbar bg-dark d-flex justify-content-end align-items-center">
  </div>
  <nav class="navbar bg-white text-dark justify-content-between align-items-center shadow-sm">
    <div class="navbar-logo">
      <a href="/index.html">
        <img src="/images/logo-bidme.png" alt="Logo of the website - Bidme." class="custom-logo-size-feed">
      </a>
    </div>
 
    <div class="navbar-additional-content bg-white d-flex justify-content-center align-items-center text-dark" id="navbarAdditionalContent">
    <div class="navbar-middle-content d-flex justify-content-center align-items-center gap-2">
    <div class="navbar-content-item">
    <a href="/index.html" class="nav-link display-1">Listings</a>
  </div>

  <div class="navbar-content-item">
<a href="/html/register/register.html" class="nav-link display-1">Register</a>
</div>
  <div class="navbar-content-item">
  <a href="/html/login/index.html" class="nav-link display-1 btn btn-primary text-white px-3">Log in</a>
</div>

  </div>
  
     <div class="navbar-content-item d-flex flex-column">
       <a href="#" class="text-primary text-end h4 p-0 fw-light custom-name"></a>
      
     </div>
     <div class="navbar-content-item m-2 avatar-custom-media">
       <a href="#" id="avatar-small-navbar">
         <img src="/images/avatar-bidme.png" alt="Avatar." id="avatar-navbar" class="custom-avatar-size">
       </a>
     </div>
      
    </div>
    <div class="navbar-toggler-custome">
      <i class="fa-solid fa-bars" class="hamburger-custom"></i>
    </div>
   
  </nav>
  </div>
  `

  const navbarToggle = document.querySelector(".navbar-toggler-custome")
  const navbarAdditionalContent = document.getElementById(
    "navbarAdditionalContent",
  )

  navbarToggle.addEventListener("click", () => {
    navbarAdditionalContent.classList.toggle("show")
  })

  function resetNavbarDisplay() {
    if (window.innerWidth > 600) {
      navbarAdditionalContent.classList.remove("show")
    }
  }

  resetNavbarDisplay()

  // Add event listener for window resize
  window.addEventListener("resize", resetNavbarDisplay)
})
