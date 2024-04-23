import { createListing } from "./create.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"

export function createNewListing() {
  try {
    const getForm = document.querySelector("#createListing")

    if (getForm) {
      getForm.addEventListener("sumbit", (event) => {
        event.preventDefault()
        const form = event.target

        const title = form.title.value
        const description = form.description.value
        const media = form.media.value

        const newListing = {
          title,
          description,
          media,
        }
        createListing(newListing)
        userFeedback("Your post has been added!", () => {
          location.reload()
        })
      })
    }
  } catch (error) {
    console.error(error)
  }
}
