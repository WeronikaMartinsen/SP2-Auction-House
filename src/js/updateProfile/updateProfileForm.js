import { updateProfile } from "./update.js"
import { load } from "../api/storage/storeToken.js"

export function initializeAvatarUpdate() {
  document.addEventListener("DOMContentLoaded", async function () {
    const avatarInput = document.getElementById("avatarInput")
    const userAvatar = load("profile").userAvatar
    const form = document.querySelector("#updateProfileBtn")

    // Check if userAvatar exists and set it as the defaultValue of avatarInput
    if (userAvatar) {
      avatarInput.value = userAvatar.url
    }

    form.addEventListener("click", async function (event) {
      event.preventDefault()

      const avatarImage = document.getElementById("avatar")
      const avatarImageNav = document.getElementById("avatar-navbar")

      const newAvatarUrl = avatarInput.value
      const userProfile = load("profile")
      const user = userProfile ? userProfile.userName : null

      if (user) {
        if (newAvatarUrl) {
          avatarImage.src = newAvatarUrl
          avatarImageNav.src = newAvatarUrl

          try {
            await updateProfile(newAvatarUrl, user)
          } catch (error) {
            console.error("Error updating avatar:", error)
          }
        } else {
          console.error("Avatar URL is required.")
        }
      } else {
        console.error("You can only update your own avatar.")
      }
    })
  })
}
