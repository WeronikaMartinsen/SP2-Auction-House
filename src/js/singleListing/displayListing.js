import { getListing } from "../listings/getListings.js"
import { id } from "../api/constants.js"
import { formatDateTime } from "../listings/formatDate.js"
import { startCountdown } from "../listings/countDown.js"

export async function updateListingDetails() {
  try {
    const response = await getListing(id)

    if (!response || !response.data) {
      console.error("Listing data not found.")
      return
    }

    const listing = response.data

    console.log("Retrieved Listing Data:", listing)

    const lastBid =
      listing.bids && listing.bids.length > 0
        ? listing.bids[listing.bids.length - 1]
        : null

    // Check if the HTML elements are selected correctly
    const titleElement = document.getElementById("title")
    console.log("Title Element:", titleElement)

    if (!titleElement) {
      console.error("Title element not found.")
      return
    }

    titleElement.innerText = listing.title || "N/A"

    // Format the created date
    const createdDate = listing.created ? new Date(listing.created) : new Date()
    document.getElementById("created").innerText = formatDateTime(createdDate)

    document.getElementById("last-bid").innerText = lastBid
      ? lastBid.amount
      : "No Bids"

    document.getElementById("description").innerText =
      listing.description || "Description"

    const sellerNameElement = document.getElementById("seller")
    const sellerName = listing.seller?.name || "Unknown Seller"

    // Create a link to the seller's profile
    const sellerProfileLink = document.createElement("a")
    sellerProfileLink.href = `/html/profiles/profile.html?name=${encodeURIComponent(sellerName)}`
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
      mediaElement.src = "/images/defaultImage.png"
      mediaElement.alt = "Default Image"

      smallMediaElements.forEach((element) => {
        element.style.display = "none"
      })
    }
    /// Update tags
    const tagsElement = document.getElementById("tags")
    if (listing.tags && Array.isArray(listing.tags)) {
      tagsElement.innerText = listing.tags.join(", ")
    } else {
      tagsElement.innerText = "No tags available"
    }
  } catch (error) {
    console.error("Error fetching listing:", error)
  }
}
