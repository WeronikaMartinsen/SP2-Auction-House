import { createListing } from "./create.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"
import { getProfile } from "../profile/getProfile.js"
import { loadProfile } from "../api/storage/storeToken.js"
import { displayAllListings } from "../listings/displayListings.js"

export async function createNewListing() {
  try {
    const getForm = document.getElementById("createListingModal")

    if (getForm) {
      getForm.addEventListener("submit", async (event) => {
        event.preventDefault()

        try {
          const profile = await loadProfile()

          const userName = profile ? profile.userName : null

          if (!userName) {
            console.error("User profile not found or incomplete.")
            return
          }

          const form = event.target
          const title = form.querySelector("#title").value
          const description = form.querySelector("#description").value
          const deadline = form.querySelector("#deadline").value

          const parsedDeadline = new Date(deadline)

          if (isNaN(parsedDeadline)) {
            // Invalid date format, handle error
            console.error("Invalid deadline format:", deadline)
            return
          }

          // Convert the parsed deadline into the desired format (e.g., ISO 8601)
          const formattedDeadline = parsedDeadline.toISOString()

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
            endsAt: formattedDeadline,
            seller: { name: userName },
          }

          const createdListing = await createListing(newListing)

          userFeedback("Your listing has been successfully added!.", () => {
            location.reload()
          })

          const listingsContainer = document.querySelector("#listings")
          if (listingsContainer) {
            displayAllListings(
              [createdListing],
              getProfile,
              listingsContainer,
              true,
              createdListing,
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
