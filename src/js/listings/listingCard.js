import { load } from "../api/storage/storeToken.js"

import { startCountdown } from "./countDown.js"

const userProfile = load("profile")

export function createListingCard(listing) {
  const card = document.createElement("div")
  card.classList.add("listing-card")
  const listingId = listing.id || "Unknown ID"

  // Image
  const imageContainer = document.createElement("div")
  imageContainer.classList.add("image-container")
  imageContainer.href = `/html/listings/singleListing.html?id=${listingId}`
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

  const sellerContainer = document.createElement("div")
  sellerContainer.classList.add("sellerContainer")

  // Append sellerContainer to card
  card.appendChild(sellerContainer)

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
  btnUpdate.textContent = ". . ."
  btnUpdate.classList.add("pe-auto")
  btnUpdate.addEventListener("click", () => {
    window.location.href = `/html/listings/updateListing.html?id=${listingId}`
  })
  const btnDelete = document.createElement("button")
  btnDelete.classList.add("px-2")
  btnDelete.classList.add("fa-solid", "fa-xmark", "pe-auto")

  if (
    userProfile &&
    userProfile.userName === (listing.seller ? listing.seller.name : undefined)
  ) {
    card.appendChild(updateContainer)
    updateContainer.appendChild(btnsContainer)
    btnsContainer.appendChild(btnUpdate)
    btnsContainer.appendChild(btnDelete)
  }

  // Avatar
  const avatarImg = document.createElement("img")
  if (listing.seller && listing.seller.avatar && listing.seller.avatar.url) {
    avatarImg.src = listing.seller.avatar.url
  } else {
    avatarImg.src = "/images/avatar-bidme.png"
  }
  avatarImg.alt = "Avatar"
  avatarImg.classList.add("sellerAvatar")

  // Append avatarImg to sellerContainer
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
  sellerName.classList.add("h6", "text-dark", "m-0")
  sellerContainer.addEventListener("click", () => {
    if (listing.seller && listing.seller.name) {
      window.location.href = `/html/profiles/profile.html?name=${encodeURIComponent(listing.seller.name)}`
    }
  })

  // Append sellerName to avatarAndDate
  avatarAndDate.appendChild(sellerName)

  const details = document.createElement("div")
  details.classList.add("details")

  // Format the created date
  const createdDate = new Date(listing.created)
  const formattedDate = createdDate.toLocaleString()

  details.textContent = formattedDate

  avatarAndDate.appendChild(details)

  const contentContainer = document.createElement("div")
  contentContainer.classList.add("contentContainer")
  card.appendChild(contentContainer)

  // Append the formatted date to the avatarAndDate container
  avatarAndDate.appendChild(details)

  // Auctions End

  const auctionsEnd = document.createElement("div")
  auctionsEnd.classList.add("auctionEnds")
  startCountdown(listing, auctionsEnd)
  card.appendChild(auctionsEnd)

  // Display the raw endsAt value without formatting
  const dateTimeElement = document.createElement("span")
  dateTimeElement.textContent = listing.endsAt

  auctionsEnd.appendChild(dateTimeElement)

  // Title
  const title = document.createElement("h6")
  title.textContent = listing.title
  title.classList.add("mt-1")
  contentContainer.appendChild(title)

  // Description
  const description = document.createElement("p")
  description.textContent = listing.description
  contentContainer.appendChild(description)

  // Tags
  if (listing.tags && listing.tags.length > 0) {
    const tagsContainer = document.createElement("div")
    tagsContainer.classList.add("tags-container")
    listing.tags.forEach((tag) => {
      const tagElement = document.createElement("span")
      tagElement.classList.add("tag")
      tagElement.textContent = tag
      tagsContainer.appendChild(tagElement)
    })
    contentContainer.appendChild(tagsContainer)
  }

  // Bids
  const bidsCount =
    listing._count && listing._count.bids ? listing._count.bids : 0 // Get the count of bids
  const bidsContainer = document.createElement("div")
  bidsContainer.classList.add("bids-container")

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
        window.location.href = `/html/profiles/profile.html?name=${encodeURIComponent(lastBid.bidder.name)}`
      }
    })
    lastBidContainer.appendChild(lastBidAmount)

    bidsContainer.appendChild(lastBidContainer)
  }

  const btnContainer = document.createElement("div")
  btnContainer.classList.add("btnContainer")

  const bidBtn = document.createElement("button")
  bidBtn.textContent = "BID"
  bidBtn.classList.add("btn", "btn-primary", "text-white")
  bidBtn.href = `/html/listings/singleListing.html?id=${listingId}`
  bidBtn.addEventListener("click", () => {
    window.location.href = imageContainer.href
  })

  btnContainer.appendChild(bidBtn)

  card.appendChild(btnContainer)

  return card
}
