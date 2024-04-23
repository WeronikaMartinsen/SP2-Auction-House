import { getProfile } from "./getProfile.js"
import { handleError } from "../userFeedback/errorMessage.js"

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Call getProfileForm function when the DOM content is loaded
    console.log("DOM content loaded")
    await getProfileForm()
  } catch (error) {
    handleError("Error fetching user profile.")
  }
})

export async function getProfileForm() {
  try {
    console.log("Fetching profile...")

    // Extract the sellerName from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search)
    const sellerName = urlParams.get("name")

    // Fetch the profile of the user with the extracted sellerName
    const profile = await getProfile(sellerName)

    console.log("Profile fetched:", profile)

    // Update the DOM with the profile information
    const userName = document.querySelector("#name")
    const userEmail = document.querySelector("#email")
    const userAvatar = document.querySelector("#avatar")
    const userCredits = document.querySelector("#credits")

    userName.textContent = profile.name
    userEmail.textContent = profile.email
    userAvatar.src = profile.avatar || "/images/avatar-bidme.png"
    userAvatar.alt = "User image."
    userCredits.textContent = profile.credits

    return profile
  } catch (error) {
    console.error("Error fetching user profile:", error)
    handleError("Error fetching user profile.")
  }
}
