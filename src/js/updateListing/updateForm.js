/* import { showModal } from "./modalUpdate.js"
import { handleError } from "../userFeedback/errorMessage.js"
import { getListing, getListing } from "../listings/getListings.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"
import { updateListing } from "./update.js"
import { id } from "../api/constants.js"


export async function updateListingForm() {
  try {
    const getListing = await getListing(id)
    console.log(getListing)
  }
}


 */

/* 
export async function updateListingForm(id) {
  try {
    // Retrieve the listing data including its ID
    const retrievedListing = await getListing(id)
    console.log(retrievedListing)
    const getForm = document.querySelector("#updateListing")

    document.getElementById("updateTitle").value = retrievedListing.title
    document.getElementById("updateDescription").value =
      retrievedListing.description

    // Set media URLs
    const mediaInputs = document.querySelectorAll(".media-input")
    retrievedListing.media.forEach((media, index) => {
      if (index < mediaInputs.length) {
        mediaInputs[index].value = media.url
      }
    })

    // Set deadline
    document.getElementById("updateDeadline").value = formatDeadline(
      retrievedListing.endsAt,
    )

    // Show the modal
    showModal()
  } catch (error) {
    handleError("Error updating listing.")
    userFeedback("Something went wrong. Please try again.", () => {
      location.reload()
    })
  }
}

// Format deadline in the correct format for input[type=datetime-local]
function formatDeadline(dateString) {
  const date = new Date(dateString)
  // Format the date as YYYY-MM-DDTHH:MM
  const formattedDate = date.toISOString().slice(0, 16)
  return formattedDate
} */
