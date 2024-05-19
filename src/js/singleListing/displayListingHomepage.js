import { getListing } from "../listings/getListings.js"
import { id } from "../api/constants.js"
import { startCountdown } from "../listings/countDown.js"
import { load } from "../api/storage/storeToken.js"
import { confirmDelateListing } from "../deleteListing/confirmDelate.js"
import { showModal } from "../userFeedback/modalMessage.js"

export async function updateListingDetails() {
  try {
    const response = await getListing(id)
    const userProfile = load("profile")

    if (!response || !response.data) {
      console.error("Listing data not found.")
      return
    }

    const listing = response.data

    const lastBid =
      listing.bids && listing.bids.length > 0
        ? listing.bids[listing.bids.length - 1]
        : null

    if (
      userProfile &&
      userProfile.userName ===
        (listing.seller ? listing.seller.name : undefined)
    ) {
      // Create update and delete buttons container
      const updateContainer = document.createElement("div")
      updateContainer.classList.add("d-flex", "justify-content-end")
      const btnsContainer = document.createElement("div")
      btnsContainer.classList.add(
        "gap-2",
        "pe-auto",
        "d-flex",
        "justify-content-center",
        "align-items-center",
      )

      // Create update button
      const btnUpdate = document.createElement("button")
      btnUpdate.textContent = "Edit"
      btnUpdate.classList.add(
        "btn",
        "border",
        "border-success",
        "px-3",
        "getProfileLinkUpdate",
      )
      btnUpdate.addEventListener("click", () => {
        // Define the message content
        const message = "You must have an account to see the listing details!"

        // Define the title
        const title = "Login Required"

        // Call the showModal function with the defined title and message
        showModal(title, message)
      })

      // Create delete button
      const btnDelete = document.createElement("button")
      btnDelete.classList.add("btn", "text-dark", "border", "px-2")
      btnDelete.textContent = "Delete"
      btnDelete.addEventListener("click", () => {
        confirmDelateListing(
          "Are you sure you want to delete your listing?",
          listing.id,
        )
      })

      // Append buttons to the container
      btnsContainer.appendChild(btnUpdate)
      btnsContainer.appendChild(btnDelete)

      // Append container to the card element
      const card = document.getElementById("card")
      if (card) {
        updateContainer.appendChild(btnsContainer)
        card.appendChild(updateContainer)
      }
    }

    // Check if the HTML elements are selected correctly
    const titleElement = document.getElementById("title")

    if (!titleElement) {
      console.error("Title element not found.")
      return
    }

    titleElement.innerText = listing.title || "N/A"

    // Function to format date and time
    const createdDate = new Date(listing.created)
    const options = { year: "numeric", month: "short", day: "numeric" }
    const formattedDate = createdDate.toLocaleDateString(undefined, options)

    // Display the formatted date
    document.getElementById("created").innerText = formattedDate

    document.getElementById("last-bid").innerText = lastBid
      ? lastBid.amount
      : "No Bids"

    const bidderElement = document.getElementById("bidder")
    if (lastBid) {
      const bidderName = lastBid.bidder.name || "Unknown Bidder"
      const bidderProfileLink = document.createElement("span")

      bidderProfileLink.textContent = bidderName
      bidderElement.innerHTML = "" // Clear previous content
      bidderElement.appendChild(bidderProfileLink)
    } else {
      bidderElement.innerText = "You can be first one!"
    }

    document.getElementById("description").innerText =
      listing.description || "Description"

    const sellerNameElement = document.getElementById("seller")
    const sellerName = listing.seller?.name || "Unknown Seller"

    // Create a link to the seller's profile
    const sellerProfileLink = document.createElement("span")

    sellerProfileLink.textContent = sellerName

    sellerNameElement.innerHTML = ""
    sellerNameElement.appendChild(sellerProfileLink)

    const endsAtElement = document.getElementById("endsAt")
    endsAtElement.textContent = listing.endsAt || "Auction ends"

    // Start countdown if listing endsAt is available
    if (listing.endsAt) {
      startCountdown(listing, endsAtElement)
    }

    // Update media
    const mediaElement = document.getElementById("media")
    const smallMediaElements = [
      document.getElementById("media-1"),
      document.getElementById("media-2"),
      document.getElementById("media-3"),
    ]

    if (
      listing.media &&
      Array.isArray(listing.media) &&
      listing.media.length > 0
    ) {
      listing.media.forEach((mediaItem, index) => {
        if (index === 0) {
          mediaElement.src = mediaItem.url
          mediaElement.alt = mediaItem.alt
        } else if (index < smallMediaElements.length) {
          smallMediaElements[index - 1].src = mediaItem.url
          smallMediaElements[index - 1].alt = mediaItem.alt

          smallMediaElements[index - 1].addEventListener("click", () => {
            const tempSrc = mediaElement.src
            const tempAlt = mediaElement.alt
            mediaElement.src = smallMediaElements[index - 1].src
            mediaElement.alt = smallMediaElements[index - 1].alt
            smallMediaElements[index - 1].src = tempSrc
            smallMediaElements[index - 1].alt = tempAlt
          })
        }
      })
    } else {
      mediaElement.style.display = "none"
      smallMediaElements.forEach((element) => {
        element.style.display = "none"
      })
    }
  } catch (error) {
    console.error("Error fetching listing:", error)
  }
}
