import { bidOnListing } from "./bidOn.js"

export function bidForm(listingId) {
  console.log("Bid form initialized")
  const form = document.querySelector("#newBid")
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault()
      console.log("Submit button clicked")
      const bidInput = form.querySelector("#bidInput")
      const placeBid = parseFloat(bidInput.value)

      if (isNaN(placeBid) || placeBid <= 0) {
        // Handle invalid bid amount
        console.error("Invalid bid amount")
        return
      }

      const newBid = {
        amount: placeBid,
      }

      try {
        await bidOnListing(newBid)

        bidInput.value = ""
        updateLastBid(placeBid)
        location.reload()
      } catch (error) {
        console.error("Error submitting bid:", error)
        // Handle error, maybe show a user feedback message
      }
    })

    // Dynamically set the href attribute of the submit button
    const submitButton = form.querySelector("#submit-btn")
    if (submitButton) {
      submitButton.href = `/html/listings/singleListing.html?id=${listingId}/bids`
    }
  }
}

export function updateLastBid(bidAmount) {
  const lastBidElement = document.querySelector("#last-bid")
  if (lastBidElement) {
    lastBidElement.textContent = bidAmount
  }
}
