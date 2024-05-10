/* import { update } from "./update.js"
import { load } from "../api/storage/storeToken"
import { toggleAvatarForm } from "./toggleAvatar"

document.addEventListener("DOMContentLoaded", async function () {
  const profileMediaButton = document.getElementById("profileMedia")
  const toggleAvatarFormButton = document.getElementById("toggleAvatarForm")

  if (profileMediaButton && toggleAvatarFormButton) {
    const getProfileFromToken = load("profile")
    const user = getProfileFromToken.userName
    window.location.href = `/html/profiles/profile.html?name=${user}`

    if (user) {
      toggleAvatarFormButton.style.display = "inline-block"
      toggleAvatarForm()
    } else {
      toggleAvatarFormButton.style.display = "none"
    }

    profileMediaButton.addEventListener("click", async function (event) {
      event.preventDefault()

      const avatarInput = document.getElementById("avatarInput")
      const avatarImage = document.getElementById("avatar")
      const avatarImageNav = document.getElementById("avatar-nav")

      const newAvatarUrl = avatarInput.value

      if (user) {
        if (newAvatarUrl) {
          avatarImage.src = newAvatarUrl
          avatarImageNav.src = newAvatarUrl

          try {
            await update(newAvatarUrl, user)
            location.reload()
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
  }
})
 */
