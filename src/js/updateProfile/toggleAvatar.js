import { load } from "../api/storage/storeToken.js"

export function toggleAvatarForm() {
  document.addEventListener("DOMContentLoaded", function () {
    const toggleAvatarFormButton = document.getElementById("toggleAvatarForm")
    const closeBtn = document.getElementById("close-btn")
    closeBtn.classList.add("float-right")
    const avatarForm = document.getElementById("avatarUploadForm")

    toggleAvatarFormButton.addEventListener("click", function (event) {
      event.preventDefault()
      if (avatarForm) {
        avatarForm.classList.toggle("d-none")
      }
    })

    closeBtn.addEventListener("click", function (event) {
      event.preventDefault()
      avatarForm.classList.toggle("d-none")
    })

    const urlParams = new URLSearchParams(window.location.search)
    const profileName = urlParams.get("name")

    // Check if the current user is the owner of the displayed profile
    const userProfile = load("profile")
    const user = userProfile ? userProfile.userName : null

    if (user === profileName) {
      // If current user is the owner, show the edit button
      toggleAvatarFormButton.style.display = "block"
    } else {
      // If not the owner, hide the edit button
      toggleAvatarFormButton.style.display = "none"
    }
  })
}
