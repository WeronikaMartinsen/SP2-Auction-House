import { updateProfile } from "./update.js"
import { load } from "../api/storage/storeToken.js"

export function initializeAvatarUpdate() {
  document.addEventListener("DOMContentLoaded", async function () {
    const avatarInput = document.getElementById("avatarInput")
    const form = document.getElementById("updateProfileBtn")

    form.addEventListener("submit", async function (event) {
      event.preventDefault()

      const newAvatarUrl = avatarInput.value
      const userProfile = load("profile")
      const user = userProfile ? userProfile.userName : null

      if (user) {
        if (newAvatarUrl) {
          try {
            // Update the avatar URL in the profile
            await updateProfile({ avatar: { url: newAvatarUrl } })

            // Update the avatar image
            const avatarImage = document.getElementById("avatar")
            const avatarImageNav = document.getElementById("avatar-navbar")
            avatarImage.src = newAvatarUrl
            avatarImageNav.src = newAvatarUrl
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
