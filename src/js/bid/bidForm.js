import { bidOnListing } from "./bidOn.js"

export function bidForm() {
  console.log("Bid form initialized")
  const form = form.querySelector("#newBid")
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
      } catch (error) {
        console.error("Error submitting bid:", error)
        // Handle error, maybe show a user feedback message
      }
    })
  }
}
export function updateLastBid(bidAmount) {
  const lastBidElement = document.querySelector("#last-bid")
  if (lastBidElement) {
    lastBidElement.textContent = bidAmount
  }
}
