import { handleError } from "../userFeedback/errorMessage.js"
import { getListing } from "../listings/getListings.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"
import { updateListing } from "./update.js"
import { id } from "../api/constants.js"

export async function updateListingForm() {
  try {
    const retrievedListing = await fetchListingById(id)
    if (!retrievedListing) {
      handleError("Error: Listing not found.")
      return
    }

    populateFormFields(retrievedListing)

    const getForm = document.querySelector("#updateListing")

    if (getForm) {
      getForm.addEventListener("submit", (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const updatedListing = {
          title: formData.get("updateTitle"),
          description: formData.get("updateDescription"),
          media: [
            formData.get("updateMedia1"),
            formData.get("updateMedia2"),
            formData.get("updateMedia3"),
          ],
          endsAt: formData.get("updateDeadline"),
        }
        updateListing(updatedListing)
      })
    }
  } catch (error) {
    console.error(error)
    handleError("Error updating listing.")
    userFeedback("Something went wrong. Please try again.", () => {
      location.reload()
    })
  }
}

async function fetchListingById(id) {
  const response = await getListing(id)
  if (!response.ok) {
    throw new Error("Error fetching listing.")
  }
  return await response.json()
}

function populateFormFields(listing) {
  document.getElementById("updateTitle").value = listing.title
  document.getElementById("updateDescription").value = listing.description
  document.getElementById("updateMedia1").value = listing.media[0] || ""
  document.getElementById("updateMedia2").value = listing.media[1] || ""
  document.getElementById("updateMedia3").value = listing.media[2] || ""
  document.getElementById("updateDeadline").value = listing.endsAt
}
