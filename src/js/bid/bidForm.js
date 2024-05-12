import { bidOnListing } from "./bidOn.js"

export function bidForm() {
  console.log("Bid form initialized")
  const form = document.querySelector("#newBid")
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault()

      const bidInput = form.querySelector("#bidInput")
      console.log("Bid Input Value:", bidInput.value)
      const bid = parseFloat(bidInput.value)

      const bidAmount = {
        amount: bid,
      }
      bidOnListing(bidAmount)
      bidInput.value = ""
    })
  }
}
