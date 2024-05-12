import { bidOnListing } from "./bidOn.js"

export function bidForm() {
  console.log("Bid form initialized")
  const form = document.querySelector("#newBid")
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault()

      const bidInput = form.querySelector("#bidInput") // Select the input field with id bidInput
      console.log("Bid Input Value:", bidInput.value) // Log the value to verify it
      const bid = parseFloat(bidInput.value)

      const bidAmount = {
        amount: bid,
      }
      bidOnListing(bidAmount)
      bidInput.value = ""
    })
  }
}
