import { logout } from "../api/auth/logout.js"
import { profileLink } from "../listings/profileLink.js"
import { getAvatar } from "../profile/getAvatar.js"

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar-custom")

  navbar.innerHTML = `
  <div class="fixed-top">
  <div class="container-fluid custom-height-pre-navbar bg-dark d-flex justify-content-end align-items-center">
  </div>
  <nav class="navbar bg-white text-dark justify-content-between align-items-center">
    <div class="navbar-logo">
      <a href="#" id="profile-logo">
        <img src="/images/logo-bidme.png" alt="Logo of the website - Bidme." class="custom-logo-size-feed">
      </a>
    </div>
 
    <div class="navbar-additional-content bg-white d-flex justify-content-center align-items-center text-dark" id="navbarAdditionalContent">
    <div class="navbar-middle-content d-flex justify-content-center align-items-center gap-2">
    <div class="navbar-content-item">
    <a href="#" id="getHomepage" class="nav-link display-1">Listings</a>
  </div>

  <div class="navbar-content-item">
    <a href="#" id="profile" class="nav-link display-1">Profile</a>
  </div>
  <div class="navbar-content-item">
  <a href="#" id="logout-nav" class="nav-link display-1 btn btn-primary text-white opacity-75 px-2">Logout</a>
</div>
  </div>
  
    
     
     <div class="navbar-content-item custom-padding-logout-btn">
     <a href="#" id="logout" class="text-dark text-end small-font-size p-0 fw-light"><i class="fa-solid fa-right-from-bracket text-dark"></i> Logout</a>
  <div class="border-light w-100 border-bottom mt-4 custom-border-width"></div>
     </div>
     <div class="navbar-content-item d-flex flex-column flex-wrap text-wrap custom-width-name-div">
       <a href="#" id="name-navbar" class="text-primary text-end h6 p-0 fw-light custom-name text-wrap"></a>
       <div class="d-flex flex-row gap-1">
         <i class="fa-solid fa-coins"></i>
         <span id="credits-navbar" class="text-dark text-end small-font-size p-0 fw-light"></span>
       </div>
     </div>
     <div class="navbar-content-item m-2 avatar-custom-media">
       <a href="#" id="avatar-small-navbar">
         <img src="/images/avatar-bidme.png" alt="Avatar." id="avatar-navbar" class="custom-avatar-size avatar-img shadow">
       </a>
     </div>
      
    </div>
    <div class="navbar-toggler-custome">
      <i class="fa-solid fa-bars p-0 m-0" class="hamburger-custom"></i>
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
    if (window.innerWidth > 665) {
      navbarAdditionalContent.classList.remove("show")
    }
  }

  resetNavbarDisplay()

  // Add event listener for window resize
  window.addEventListener("resize", resetNavbarDisplay)

  logout()
  profileLink()
  getAvatar()
})
