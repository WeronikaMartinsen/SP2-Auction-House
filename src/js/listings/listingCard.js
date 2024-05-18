import { load } from "../api/storage/storeToken.js"
import { confirmDelateListing } from "../deleteListing/confirmDelate.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"
import { startCountdown } from "./countDown.js"

const userProfile = load("profile")
const getProfileFromToken = load("profile")
const user = getProfileFromToken.userName

export function createListingCard(listing) {
  const card = document.createElement("div")
  card.classList.add("listing-card")
  const listingId = listing.id || "Unknown ID"

  // Image
  const imageContainer = document.createElement("div")
  imageContainer.classList.add("image-container")
  imageContainer.href = `/html/listings/singleListing.html?name=${user}&id=${listingId}`
  imageContainer.addEventListener("click", () => {
    window.location.href = imageContainer.href
  })

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
  imageContainer.appendChild(image)

  card.appendChild(imageContainer)

  const mainContent = document.createElement("div")
  mainContent.classList.add("main-content")

  const sellerContainer = document.createElement("div")
  sellerContainer.classList.add("sellerContainer")

  // Append sellerContainer to card
  mainContent.appendChild(sellerContainer)

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
  const btnUpdate = document.createElement("button")

  btnUpdate.classList.add(
    "text-dark",
    "getProfileLinkUpdate",
    "fa-solid",
    "fa-pen-to-square",
    "btn",
    "border-none",
  )
  btnUpdate.addEventListener("click", () => {
    window.location.href = `/html/listings/updateListing.html?name=${user}&id=${listingId}`
  })
  const btnDelete = document.createElement("button")
  btnDelete.classList.add("fa-solid", "fa-trash", "text-dark", "btn", "btn-sm")
  btnDelete.addEventListener("click", () => {
    confirmDelateListing(
      "Are you sure you want to delate your listing?",
      listingId,
    )
  })

  if (
    userProfile &&
    userProfile.userName === (listing.seller ? listing.seller.name : undefined)
  ) {
    mainContent.appendChild(updateContainer)
    updateContainer.appendChild(btnsContainer)
    btnsContainer.appendChild(btnUpdate)
    btnsContainer.appendChild(btnDelete)
  }

  const avatarImg = document.createElement("img")

  // Check if the listing has a seller and a valid avatar URL
  if (listing.seller && listing.seller.avatar && listing.seller.avatar.url) {
    avatarImg.src = listing.seller.avatar.url
  } else {
    avatarImg.src = "/images/avatar-bidme.png"
    console.log("Using default avatar")
  }

  // Set image alt attribute and CSS class
  avatarImg.alt = "Avatar"
  avatarImg.classList.add("sellerAvatar")

  // Add an error handler to use the default image if the avatar fails to load
  avatarImg.onerror = function () {
    avatarImg.src = "/images/avatar-bidme.png"
    console.log("Avatar image failed to load, using default avatar")
  }

  // Append avatar image to the seller container
  sellerContainer.appendChild(avatarImg)

  const avatarAndDate = document.createElement("div")
  avatarAndDate.classList.add("avatarAndDate")

  // Append avatarAndDate to sellerContainer
  sellerContainer.appendChild(avatarAndDate)

  // Other details

  const sellerName = document.createElement("a")
  sellerName.textContent =
    listing.seller && listing.seller.name
      ? listing.seller.name
      : "Unknown Seller"
  sellerName.classList.add("h6", "text-dark", "m-0", "fw-light")
  sellerContainer.addEventListener("click", () => {
    if (listing.seller && listing.seller.name) {
      window.location.href = `/html/profiles/profile.html?name=${listing.seller.name}`
    }
  })

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
  mainContent.appendChild(contentContainer)

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

  const bidsCount =
    listing._count && listing._count.bids ? listing._count.bids : 0 // Get the count of bids
  const bidsContainer = document.createElement("div")
  bidsContainer.classList.add("m-0")

  if (bidsCount > 0 && listing.bids) {
    const lastBid = listing.bids[listing.bids.length - 1] // Get the last bid

    const bidsCountElement = document.createElement("p")
    bidsCountElement.textContent = `Bids: ${bidsCount}`
    bidsContainer.appendChild(bidsCountElement)

    contentContainer.appendChild(bidsContainer)

    const lastBidContainer = document.createElement("div")
    lastBidContainer.classList.add("last-bid-container")

    const lastBidAmount = document.createElement("div")
    lastBidAmount.classList.add("d-flex", "gap-1")
    lastBidAmount.innerHTML = `<h2 class="text-primary">${lastBid.amount},-</h2><span class="small-font-size">bidder:</span><a class="bidder small-font-size">${lastBid.bidder.name}</a>`
    lastBidAmount.addEventListener("click", () => {
      if (lastBid.bidder.name && lastBid.bidder.name) {
        window.location.href = `/html/profiles/profile.html?name=${lastBid.bidder.name}&id=${listingId}`
      }
    })
    lastBidContainer.appendChild(lastBidAmount)

    bidsContainer.appendChild(lastBidContainer)
  }

  const btnContainer = document.createElement("div")
  btnContainer.classList.add("btnContainer")

  const bidBtn = document.createElement("button")
  bidBtn.textContent = "BID"
  bidBtn.classList.add("btn", "btn-primary", "text-white", "px-5")
  bidBtn.href = `/html/listings/singleListing.html?id=${listingId}`
  bidBtn.addEventListener("click", () => {
    if (!userProfile) {
      userFeedback("You need to be logged in to bid on the listing!.", () => {
        window.location.href = `/html/login/index.html`
      })
    } else {
      // If user is logged in, proceed with bid action
      window.location.href = `/html/listings/singleListing.html?id=${listingId}`
    }
  })

  btnContainer.appendChild(bidBtn)

  mainContent.appendChild(btnContainer)
  card.appendChild(mainContent)

  return card
}
