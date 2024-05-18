import { startCountdown } from "../listings/countDown.js"
import { showModal } from "../userFeedback/modalMessage.js"

export function createListingCard(listing) {
  const card = document.createElement("div")
  card.classList.add("listing-card")

  // Image
  const imageContainer = document.createElement("div")
  imageContainer.classList.add("image-container")

  const image = document.createElement("img")
  if (listing.media && listing.media.length > 0) {
    // Access the first media object in the array
    const media = listing.media[0]
    if (media && media.url) {
      image.src = media.url
    } else {
      image.src = "/images/defaultImage.png"
    }
    image.alt = media && media.alt ? media.alt : "Listing Image"
  } else {
    image.src = "/images/defaultImage.png"
    image.alt = "Listing Image"
  }
  imageContainer.addEventListener("click", () => {
    // Define the message content
    const message = "You must have an account to see the listing details!"

    // Define the title
    const title = "Login Required"

    // Call the showModal function with the defined title and message
    showModal(title, message)
  })

  imageContainer.appendChild(image)

  card.appendChild(imageContainer)

  const sellerContainer = document.createElement("div")
  sellerContainer.classList.add("sellerContainer")

  // Append sellerContainer to card
  card.appendChild(sellerContainer)

  // Avatar
  const avatarImg = document.createElement("img")
  if (listing.seller && listing.seller.avatar && listing.seller.avatar.url) {
    avatarImg.src = listing.seller.avatar.url
  } else {
    avatarImg.src = "/images/avatar-bidme.png"
  }
  avatarImg.alt = "Avatar"
  avatarImg.classList.add("sellerAvatar")

  // Add error handler for avatar image
  avatarImg.onerror = function () {
    avatarImg.src = "/images/avatar-bidme.png"
  }

  sellerContainer.appendChild(avatarImg)

  const avatarAndDate = document.createElement("div")
  avatarAndDate.classList.add("avatarAndDate")
  sellerContainer.appendChild(avatarAndDate)

  // Append avatarAndDate to sellerContainer
  sellerContainer.appendChild(avatarAndDate)

  // Other details

  const sellerName = document.createElement("a")
  sellerName.textContent =
    listing.seller && listing.seller.name
      ? listing.seller.name
      : "Unknown Seller"
  sellerName.classList.add("h6", "text-dark", "m-0")

  // Append sellerName to avatarAndDate
  avatarAndDate.appendChild(sellerName)

  const details = document.createElement("div")
  details.classList.add("details")

  // Format the created date to display only the date
  const createdDate = new Date(listing.created)
  const options = { year: "numeric", month: "short", day: "numeric" }
  const formattedDate = createdDate.toLocaleDateString(undefined, options)

  details.textContent = formattedDate

  avatarAndDate.appendChild(details)

  const contentContainer = document.createElement("div")
  contentContainer.classList.add("contentContainer")
  card.appendChild(contentContainer)

  // Append the formatted date to the avatarAndDate container
  avatarAndDate.appendChild(details)

  // Auctions End
  const auctionsEnd = document.createElement("div")
  auctionsEnd.classList.add("auctionEnds", "rounded-3", "bg-opacity-75")

  // Start Countdown after appending clock icon
  startCountdown(listing, auctionsEnd)

  // Display the raw endsAt value without formatting
  const dateTimeElement = document.createElement("span")
  dateTimeElement.textContent = listing.endsAt
  auctionsEnd.appendChild(dateTimeElement)

  card.appendChild(auctionsEnd)
  // Title
  const title = document.createElement("h6")
  title.textContent = listing.title
  title.classList.add("mt-1")
  contentContainer.appendChild(title)

  return card
}
