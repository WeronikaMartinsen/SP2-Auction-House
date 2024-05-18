import { bidOnListing } from "./bidOn.js"

export function bidForm() {
  const form = document.querySelector("#newBid")
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault()

      const bidInput = form.querySelector("#bidInput")

      const bid = parseFloat(bidInput.value)

      const bidAmount = {
        amount: bid,
      }
      bidOnListing(bidAmount)
      bidInput.value = ""
    })
  }
}
