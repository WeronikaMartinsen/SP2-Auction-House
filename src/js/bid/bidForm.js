import { userFeedback } from "../userFeedback/feedbackOverlay.js"
import { bidOnListing } from "./bidOn.js"

export function initializeBidForm() {
  console.log("Initializing bid form...")
  const bidForm = document.getElementById("newBid")
  if (bidForm) {
    bidForm.addEventListener("submit", handleBidSubmission)
    console.log("Bid form initialized successfully.")
  } else {
    console.error("Bid form element not found.")
  }
}

export async function handleBidSubmission(event) {
  if (!event) {
    console.error("Event is undefined.")
    return
  }

  event.preventDefault()

  const form = event.target
  const bidAmount = parseFloat(form.bid.value)

  if (isNaN(bidAmount) || bidAmount <= 0) {
    userFeedback("Your bid must be higher than the current one.", () => {
      // Callback function to execute after the timeout
      location.reload()
    })
    return
  }

  try {
    const newBid = {
      amount: bidAmount,
    }
    await bidOnListing(newBid)
    form.bid.value = ""
  } catch (error) {
    userFeedback("Something went wrong, please try again.", () => {
      // Callback function to execute after the timeout
      location.reload()
    })
    console.error(error)
  }
}
