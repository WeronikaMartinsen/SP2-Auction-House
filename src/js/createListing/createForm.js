import { createListing } from "./create.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"
import { getProfile } from "../profile/getProfile.js"
import { loadProfile } from "../api/storage/storeToken.js"
import { displayFilteredListings } from "../listings/displayListings.js"

export async function createNewListing() {
  try {
    const getForm = document.getElementById("createListing")

    if (getForm) {
      getForm.addEventListener("submit", async (event) => {
        event.preventDefault()
        console.log("Form submitted!")

        try {
          console.log("Fetching user profile...")
          const profile = await loadProfile()
          console.log("User profile fetched:", profile)
          const userName = profile ? profile.userName : null

          if (!userName) {
            console.error("User profile not found or incomplete.")
            return
          }

          const form = event.target
          const title = form.querySelector("#title").value
          const description = form.querySelector("#description").value
          const deadline = form.querySelector("#deadline").value

          console.log("Deadline value:", deadline)

          // Log the endsAt value
          const endsAt = new Date(deadline).toISOString()
          console.log("EndsAt value:", endsAt)

          const mediaInputs = Array.from(form.querySelectorAll(".media-input"))
          const media = mediaInputs
            .map((input) => {
              const url = input.value.trim()
              return url ? { url, alt: "Listing Image" } : null
            })
            .filter((media) => media !== null)

          const newListing = {
            title,
            description,
            media,
            endsAt,
            seller: { name: userName },
          }

          // Log the newListing object
          console.log("New Listing:", newListing)

          const createdListing = await createListing(newListing)
          console.log("Created Listing:", createdListing)

          userFeedback("Your listing has been successfully added!.", () => {
            location.reload()
          })

          const listingsContainer = document.querySelector("#listings")
          if (listingsContainer) {
            console.log("Displaying filtered listings...")
            displayFilteredListings(
              [createdListing],
              getProfile,
              listingsContainer,
              true,
            )
          }
        } catch (error) {
          console.error("Error creating listing:", error)
          userFeedback("Something went wrong. Please try again.")
        }
      })
    }
  } catch (error) {
    console.error(error)
  }
}
