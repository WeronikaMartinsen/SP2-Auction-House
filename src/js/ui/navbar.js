import { logout } from "../api/auth/logout.js"
import { profileLink } from "../listings/profileLink.js"
import { getAvatar } from "../profile/getAvatar.js"

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
    <div class="navbar-content-item">
      <a href="#" id="avatar-small-navbar">
        <img src="/images/avatar-bidme.png" alt="Avatar." id="avatar-navbar" class="custom-avatar-size sellerAvatar avatar-img shadow">
      </a>
    </div>
    <div class="navbar-content-item custom-padding-logout-btn">
      <a href="#" id="logout" class="btn btn-light rounded-4 text-dark border border-dark px-4 shadow-sm">Logout</a>
    </div>
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

  logout()
  profileLink()
  getAvatar()
})
