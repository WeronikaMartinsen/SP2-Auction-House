import { createListing } from "./create.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"
import { getProfile } from "../profile/getProfile.js"
import { createListingCard } from "../listings/listingCard.js"

export function createNewListing() {
  try {
    const getForm = document.getElementById("createListing")

    if (getForm) {
      getForm.addEventListener("submit", async (event) => {
        event.preventDefault()
        console.log("Form submitted!")
        const form = event.target
        const title = form.querySelector("#title").value
        const description = form.querySelector("#description").value
        const deadline = form.querySelector("#deadline").value

        // Collect media URLs as an array
        const mediaInputs = Array.from(form.querySelectorAll(".media-input"))
        const media = mediaInputs
          .map((input) => input.value.trim())
          .filter((url) => url !== "")

        // Create a new listing object
        const newListing = {
          title,
          description,
          media,
          endsAt: new Date(deadline).toISOString(), // Convert deadline to ISO string
        }

        try {
          // Call the createListing function with the newListing object
          const createdListing = await createListing(newListing)

          // Display the newly created listing
          displayNewListing(createdListing)

          // Provide user feedback
          userFeedback("Your listing has been added!")
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

async function displayNewListing(newListing) {
  const listingsContainer = document.querySelector("#listings")

  // Create a new listing card for the newly created listing
  const card = createListingCard(newListing, getProfile)

  // Prepend the new listing card to the top of the listings container
  listingsContainer.prepend(card)
}
