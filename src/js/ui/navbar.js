import { logout } from "../api/auth/logout.js"
import { profileLink } from "../listings/profileLink.js"
import { getAvatar } from "../profile/getAvatar.js"

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar-custom")

  navbar.innerHTML = `
    <div class="container-fluid custom-height-pre-navbar bg-dark d-flex justify-content-end align-items-center">
    </div>
    <nav class="navbar bg-light justify-content-between align-items-center">
      <div class="navbar-logo">
        <a href="#" id="profile-logo">
          <img src="/images/logo-bidme.png" alt="Logo of the website - Bidme." class="custom-logo-size-feed">
        </a>
      </div>
      <div class="navbar-additional-content bg-light d-flex justify-content-end align-items-end" id="navbarAdditionalContent">
        <div class="navbar-content-item">
          <a href="#" class="nav-link">Listings</a>
        </div>
        <div class="navbar-content-item">
          <a href="#" class="nav-link">Profile</a>
        </div>
        <div class="navbar-content-item">
          <a href="#" class="nav-link">Sell Listing</a>
        </div>
        <div class="navbar-content-item custom-padding-logout-btn">
        <a href="#" id="logout" class="text-dark text-end small-font-size p-0"><i class="fa-solid fa-right-from-bracket text-dark"></i> Logout</a>
      </div>
        <div class="navbar-content-item d-flex flex-column">
          <a href="#" id="name-navbar" class="text-primary text-end h5 p-0"></a>
          <div class="d-flex gap-1">
            <i class="fa-solid fa-coins"></i>
            <span id="credits-navbar" class="text-dark text-end small-font-size p-0"></span>
          </div>
        </div>
        <div class="navbar-content-item m-2">
          <a href="#" id="avatar-small-navbar">
            <img src="/images/avatar-bidme.png" alt="Avatar." id="avatar-navbar" class="custom-avatar-size avatar-img shadow">
          </a>
        </div>
        
      </div>
      <div class="navbar-toggler-custome">
        <i class="fa-solid fa-bars"></i>
      </div>
     
    </nav>
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

  logout()
  profileLink()
  getAvatar()
})
