import { getProfile } from "./getProfile.js"
import { handleError } from "../userFeedback/errorMessage.js"

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await getProfileForm()
  } catch (error) {
    handleError("Error fetching user profile.")
  }
})

export async function getProfileForm() {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const sellerName = urlParams.get("name")

    // Fetch the profile of the user with the extracted sellerName
    const response = await getProfile(sellerName)
    const profile = response.data // Access the `data` object

    // Update the DOM with the profile information
    const userName = document.querySelector("#name")
    const userEmail = document.querySelector("#email")
    const userAvatar = document.querySelector("#avatar")
    const userCredits = document.querySelector("#credits")

    userName.textContent = profile.name
    userEmail.textContent = profile.email
    if (profile.avatar && profile.avatar.url) {
      userAvatar.src = profile.avatar.url
    } else {
      userAvatar.src = "/images/avatar-bidme.png"
    }
    userAvatar.alt = "User image."

    // Add an error handler to the avatar image
    userAvatar.onerror = function () {
      userAvatar.src = "/images/avatar-bidme.png"
    }

    userCredits.textContent = profile.credits

    return profile
  } catch (error) {
    console.error("Error fetching user profile:", error)
    handleError("Error fetching user profile.")
  }
}
