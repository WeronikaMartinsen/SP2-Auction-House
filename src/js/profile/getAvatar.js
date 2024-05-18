import { getProfile } from "./getProfile.js"
import { handleError } from "../userFeedback/errorMessage.js"
import { load } from "../api/storage/storeToken.js"

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

    const getProfileFromToken = load("profile")
    const user = getProfileFromToken.userName

    const response = await getProfile(user)
    const profile = response.data // Access the `data` object

    // Update the DOM with the profile information
    const userName = document.querySelector("#name-navbar")
    const avatarSmallNavbar = document.querySelector("#avatar-small-navbar")
    const userAvatar = document.querySelector(".avatar-img")
    const userCredits = document.querySelector("#credits-navbar")

    userName.textContent = profile.name

    avatarSmallNavbar.src = profile.avatar.url || "/images/avatar-bidme.png"
    avatarSmallNavbar.alt = "User image."

    userAvatar.src = profile.avatar.url || "/images/avatar-bidme.png"
    userAvatar.alt = "User image."

    userCredits.textContent = `Credits: ` + profile.credits

    return profile
  } catch (error) {
    console.error("Error fetching user profile:", error)
    handleError("Error fetching user profile.")
  }
}
