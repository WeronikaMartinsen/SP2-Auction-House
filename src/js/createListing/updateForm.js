import { updateListing } from "./update.js"
import { handleError } from "../userFeedback/errorMessage.js"
import { getListing } from "../listings/getListings.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"
import { id } from "../api/constants.js"

export async function updateListingForm() {
  try {
    // Retrieve the listing data including its ID
    const retrievedListing = await getListing(id)

    // Set the form input values with the retrieved listing data
    document.getElementById("updateTitle").value = retrievedListing.title
    document.getElementById("updateDescription").value =
      retrievedListing.description
    document.getElementById("updateDeadline").value = retrievedListing.endsAt

    const mediaInputs = document.querySelectorAll(".media-input")
    retrievedListing.media.forEach((media, index) => {
      if (index < mediaInputs.length) {
        mediaInputs[index].value = media.url
      }
    })

    const updateForm = document.querySelector("#updateListing")

    if (updateForm) {
      updateForm.addEventListener("submit", async (event) => {
        event.preventDefault()
        const form = event.target

        const title = form.updateTitle.value
        const description = form.updateDescription.value
        const mediaInputs = Array.from(form.querySelectorAll(".media-input"))
        const media = mediaInputs.map((input) => ({ url: input.value }))
        const deadline = form.updateDeadline.value

        const newUpdatedListing = {
          title,
          description,
          media,
          deadline,
        }

        try {
          // Pass the listing ID and the updated listing data to the updateListing function
          await updateListing(retrievedListing.id, newUpdatedListing)
          userFeedback("You have successfully updated listing!", () => {
            location.reload()
          })
        } catch (error) {
          handleError("Error updating listing.")
          userFeedback("Something went wrong. Please try again.", () => {
            location.reload()
          })
        }
      })
    }
  } catch (error) {
    handleError("Error updating listing.")
    userFeedback("Something went wrong. Please try again.", () => {
      location.reload()
    })
  }
}
