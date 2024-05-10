import { getProfile } from "./getProfile.js"
import { handleError } from "../userFeedback/errorMessage.js"

document.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log("DOM content loaded")
    await getAvatar()
  } catch (error) {
    handleError("Error fetching user profile.")
  }
})

export async function getAvatar() {
  try {
    console.log("Fetching profile...")

    // Extract the sellerName from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search)
    const sellerName = urlParams.get("name")

    // Fetch the profile of the user with the extracted sellerName
    const response = await getProfile(sellerName)
    const profile = response.data // Access the `data` object

    console.log("Profile fetched:", profile)

    // Update the DOM with the profile information
    const userName = document.querySelector("#name-navbar")
    const userAvatar = document.querySelector(".avatar-img")
    const userCredits = document.querySelector("#credits-navbar")

    userName.textContent = profile.name

    userAvatar.src = profile.avatar.url || "/images/avatar-bidme.png"
    userAvatar.alt = "User image."

    userCredits.textContent = `Credits: ` + profile.credits

    return profile
  } catch (error) {
    console.error("Error fetching user profile:", error)
    handleError("Error fetching user profile.")
  }
}
