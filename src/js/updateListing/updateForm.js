import { handleError } from "../userFeedback/errorMessage.js"
import { getListing } from "../listings/getListings.js"
import { updateListing } from "./update.js"
import { id } from "../api/constants.js"

export async function updateListingForm() {
  try {
    const response = await getListing(id)
    const listing = response.data

    document.getElementById("updateTitle").value = listing.title
    document.getElementById("updateDescription").value = listing.description
    document.getElementById("updateMedia1").value = listing.media[0]?.url || ""
    document.getElementById("updateMedia2").value = listing.media[1]?.url || ""
    document.getElementById("updateMedia3").value = listing.media[2]?.url || ""
    const endDate = new Date(listing.endsAt)
    const endDateString = endDate.toISOString().split("T")[0]
    document.getElementById("updateDeadline").value = endDateString

    const getForm = document.querySelector("#updateListing")

    if (getForm) {
      getForm.addEventListener("submit", (event) => {
        event.preventDefault()

        const form = event.target
        const title = form.updateTitle.value
        const description = form.updateDescription.value

        const isValidUrl = (url) => {
          try {
            new URL(url)
            return true
          } catch (error) {
            return false
          }
        }

        const mediaUrls = [
          form.updateMedia1.value,
          form.updateMedia2.value,
          form.updateMedia3.value,
        ]

        const updatedMedia = mediaUrls
          .map((url) => {
            return isValidUrl(url) ? { url } : null
          })
          .filter((media) => media !== null)

        const deadline = form.updateDeadline.value

        const updatedListing = {
          title: title,
          description: description,
          media: updatedMedia,
          endsAt: deadline,
        }

        updateListing(updatedListing)
      })
    }
  } catch (error) {
    console.error(error)
    handleError("Error updating listing.")
  }
}
