import { logout } from "../api/auth/logout.js"
import { profileLink } from "../listings/profileLink.js"
import { getAvatar } from "../profile/getAvatar.js"

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar-custom")

  navbar.innerHTML = `
    <div class="container-fluid custom-height-pre-navbar bg-dark d-flex justify-content-end align-items-center">
  </div>
    <header class="bg-light sticky-top">
      <nav class="navbar navbar-expand-sm text-white p-0">
        <div class="container-fluid d-flex align-items-center p-1 border border-bottom shadow-sm">
          <div class="float-left px-2">
            <a class="navbar-brand" id="profile-logo" href="#">
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
              <a class="nav-link" href="#">Sell items</a>
            </li>
            <li class="nav-item"> 
            <a class="nav-link" id="profile" href="#">Profile</a></li>
            </ul>
          
            <div class="px-3 d-flex justify-content-center align-items-center">
            <div class="d-flex flex-column px-2">
                <a id="name-navbar" href="#" class="text-primary text-end"></a>
                <span id="credits-navbar" class="text-dark"></span>
            </div>
            <div>
                <a id="avatar-small-navbar">
                <img
                    id="avatar-navbar"
                    class="custom-avatar-size sellerAvatar avatar-img shadow"
                    src="/images/avatar-bidme.png"
                    alt="Avatar."
                />
                </a>
                
            </div>
            <div class="custom-padding-logout-btn"> 
            <a class="btn btn-outline-dark rounded-4 text-dark shadow-sm" id="logout" href="#">Log out</a></div>     
        </div>
        
            
          </div>
        </div>
      </nav>
    </header>
  `
  logout()
  profileLink()
  getAvatar()
})
