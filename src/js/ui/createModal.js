// modal.js

export function initializeModal() {
  const createListingModal = new bootstrap.Modal(
    document.getElementById("createListingModal"),
  )

  const createListingForm = document.getElementById("createListing")

  createListingForm.addEventListener("submit", function (event) {
    event.preventDefault()
    const formData = new FormData(createListingForm)
    fetch("/api/createListing", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Listing created successfully!")
          createListingModal.hide()
        } else {
          throw new Error("Failed to create listing")
        }
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  })
}
