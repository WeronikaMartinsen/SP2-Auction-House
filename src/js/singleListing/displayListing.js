import { getListing } from "../listings/getListings.js"
import { id } from "../api/constants.js"

export async function updateListingDetails() {
  try {
    const listing = await getListing(id)

    console.log("Retrieved Listing Data:", listing)

    document.getElementById("title").innerText = listing.title || "N/A"
    document.getElementById("created").innerText = listing.created || "N/A"
    document.getElementById("count-bids").innerText =
      listing._count.bids || "N/A"
    document.getElementById("description").innerText =
      listing.description || "Description"

    const sellerNameElement = document.getElementById("seller")
    const sellerName = listing.seller?.name || "Unknown Seller"

    // Create a link to the seller's profile
    const sellerProfileLink = document.createElement("a")
    sellerProfileLink.href = `/html/profiles/profile.html?name=${encodeURIComponent(sellerName)}`
    sellerProfileLink.textContent = sellerName

    // Replace the seller name text with the link
    sellerNameElement.innerHTML = "" // Clear the content first
    sellerNameElement.appendChild(sellerProfileLink)

    // Update media
    const mediaElement = document.getElementById("media")
    const smallMediaElements = [
      document.getElementById("media-1"),
      document.getElementById("media-2"),
      document.getElementById("media-3"),
    ]

    listing.media.forEach((mediaUrl, index) => {
      if (index === 0) {
        mediaElement.src = mediaUrl
        mediaElement.alt = "Listing Image"
      } else if (index < smallMediaElements.length + 1) {
        smallMediaElements[index - 1].src = mediaUrl
        smallMediaElements[index - 1].alt = "Listing Image"

        // Add click event listener to swap images
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

    // Set default images for remaining small elements
    for (let i = listing.media.length; i < smallMediaElements.length; i++) {
      smallMediaElements[i].src = "/images/defaultImage.png"
      smallMediaElements[i].alt = "Default Image"
    }

    // Update tags
    const tagsElement = document.getElementById("tags")
    tagsElement.innerText = listing.tags.join(", ")
  } catch (error) {
    console.error("Error fetching listing:", error)
  }
}
