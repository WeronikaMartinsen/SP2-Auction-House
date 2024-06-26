import { getListings } from "./getListings.js"
import { load } from "../api/storage/storeToken.js"
import { handleError } from "../userFeedback/errorMessage.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"
import { createListingCard } from "./listingCard.js"

const LISTINGS_PER_PAGE = 12

export async function displayAllListings() {
  try {
    const response = await getListings()
    let allListings = response.data

    const getProfile = load("profile")

    if (!Array.isArray(allListings)) {
      console.error("Error: getListings did not return an array:", allListings)
      return
    }

    sortListingsByCreationDateDesc(allListings)

    allListings.sort((a, b) => new Date(b.created) - new Date(a.created))

    const searchInput = document.querySelector("#search")
    const listingsContainer = document.querySelector("#listings")
    const filterOptionTwo = document.querySelector("#old-to-new")
    const filterOptionThree = document.querySelector("#all-listings")
    const filterOptionFour = document.querySelector("#active-listings")
    const loadMoreBtn = document.querySelector("#loadMore")
    const bidLessThan100Option = document.querySelector("#bid-less-than-100")
    const bidLessThan200Option = document.querySelector("#bid-less-than-200")
    const bidLessThan300Option = document.querySelector("#bid-less-than-300")
    const bidLessThan400Option = document.querySelector("#bid-less-than-400")
    const bidLessThan500Option = document.querySelector("#bid-less-than-500")
    const bidLessThan600Option = document.querySelector("#bid-less-than-600")
    const bidLessThan700Option = document.querySelector("#bid-less-than-700")
    const bidLessThan800Option = document.querySelector("#bid-less-than-800")
    const bidLessThan900Option = document.querySelector("#bid-less-than-900")
    const bidLessThan1000Option = document.querySelector("#bid-less-than-1000")

    let currentPage = 1

    filterOptionTwo.addEventListener("click", function () {
      sortListingsByCreationDateAsc(allListings)
      displayFilteredListings(allListings, getProfile, listingsContainer)
    })

    filterOptionThree.addEventListener("click", function () {
      sortListingsByCreationDateDesc(allListings)
      displayFilteredListings(allListings, getProfile, listingsContainer)
    })

    filterOptionFour.addEventListener("click", function () {
      const currentDate = new Date()
      const activeListings = allListings.filter((listing) => {
        const endDate = new Date(listing.endsAt)

        return endDate > currentDate
      })

      displayFilteredListings(activeListings, getProfile, listingsContainer)
    })

    bidLessThan100Option.addEventListener("click", function () {
      const bidLessThan100Listings = allListings.filter((listing) => {
        const lastBid = getLastBid(listing.bids)
        return lastBid && lastBid.amount < 100
      })
      displayFilteredListings(
        bidLessThan100Listings,
        getProfile,
        listingsContainer,
      )
    })

    bidLessThan200Option.addEventListener("click", function () {
      const bidLessThan200Listings = allListings.filter((listing) => {
        const lastBid = getLastBid(listing.bids)
        return lastBid && lastBid.amount > 100 && lastBid.amount < 200
      })
      displayFilteredListings(
        bidLessThan200Listings,
        getProfile,
        listingsContainer,
      )
    })

    bidLessThan300Option.addEventListener("click", function () {
      const bidLessThan300Listings = allListings.filter((listing) => {
        const lastBid = getLastBid(listing.bids)
        return lastBid && lastBid.amount > 200 && lastBid.amount < 300
      })
      displayFilteredListings(
        bidLessThan300Listings,
        getProfile,
        listingsContainer,
      )
    })

    bidLessThan400Option.addEventListener("click", function () {
      const bidLessThan400Listings = allListings.filter((listing) => {
        const lastBid = getLastBid(listing.bids)
        return lastBid && lastBid.amount > 300 && lastBid.amount < 400
      })
      displayFilteredListings(
        bidLessThan400Listings,
        getProfile,
        listingsContainer,
      )
    })

    bidLessThan500Option.addEventListener("click", function () {
      const bidLessThan500Listings = allListings.filter((listing) => {
        const lastBid = getLastBid(listing.bids)
        return lastBid && lastBid.amount > 400 && lastBid.amount < 500
      })
      displayFilteredListings(
        bidLessThan500Listings,
        getProfile,
        listingsContainer,
      )
    })

    bidLessThan600Option.addEventListener("click", function () {
      const bidLessThan600Listings = allListings.filter((listing) => {
        const lastBid = getLastBid(listing.bids)
        return lastBid && lastBid.amount > 500 && lastBid.amount < 600
      })
      displayFilteredListings(
        bidLessThan600Listings,
        getProfile,
        listingsContainer,
      )
    })

    bidLessThan700Option.addEventListener("click", function () {
      const bidLessThan700Listings = allListings.filter((listing) => {
        const lastBid = getLastBid(listing.bids)
        return lastBid && lastBid.amount > 600 && lastBid.amount < 700
      })
      displayFilteredListings(
        bidLessThan700Listings,
        getProfile,
        listingsContainer,
      )
    })

    bidLessThan800Option.addEventListener("click", function () {
      const bidLessThan800Listings = allListings.filter((listing) => {
        const lastBid = getLastBid(listing.bids)
        return lastBid && lastBid.amount > 700 && lastBid.amount < 800
      })
      displayFilteredListings(
        bidLessThan800Listings,
        getProfile,
        listingsContainer,
      )
    })

    bidLessThan900Option.addEventListener("click", function () {
      const bidLessThan900Listings = allListings.filter((listing) => {
        const lastBid = getLastBid(listing.bids)
        return lastBid && lastBid.amount > 800 && lastBid.amount < 900
      })
      displayFilteredListings(
        bidLessThan900Listings,
        getProfile,
        listingsContainer,
      )
    })

    bidLessThan1000Option.addEventListener("click", function () {
      const bidLessThan1000Listings = allListings.filter((listing) => {
        const lastBid = getLastBid(listing.bids)
        return lastBid && lastBid.amount > 900 && lastBid.amount < 1000
      })
      displayFilteredListings(
        bidLessThan1000Listings,
        getProfile,
        listingsContainer,
      )
    })
    searchInput.addEventListener("keyup", function (event) {
      const searchValue = event.target.value.trim().toLowerCase()
      const filteredListings = allListings.filter(function (listing) {
        return (
          listing.title.toLowerCase().includes(searchValue) ||
          listing.seller.name.toLowerCase().includes(searchValue)
        )
      })

      displayFilteredListings(filteredListings, getProfile, listingsContainer)
    })

    loadMoreBtn.addEventListener("click", function () {
      currentPage++
      const startIndex = (currentPage - 1) * LISTINGS_PER_PAGE
      const endIndex = startIndex + LISTINGS_PER_PAGE
      const nextListings = allListings.slice(startIndex, endIndex)
      displayFilteredListings(nextListings, getProfile, listingsContainer, true)

      if (endIndex >= allListings.length) {
        loadMoreBtn.disabled = true
      }
    })

    displayFilteredListings(
      allListings.slice(0, LISTINGS_PER_PAGE),
      getProfile,
      listingsContainer,
    )
  } catch (error) {
    console.error("Error fetching and displaying listings:", error)
    handleError("Error fetching and displaying listings")
    userFeedback("Something went wrong. Please, try again.", () => {
      // Callback function to execute after the timeout
      location.reload()
    })
  }
}

function sortListingsByCreationDateDesc(listings) {
  listings.sort((a, b) => new Date(b.created) - new Date(a.created))
}

function sortListingsByCreationDateAsc(listings) {
  listings.sort((a, b) => new Date(a.created) - new Date(b.created))
}

export function displayFilteredListings(
  listings,
  getProfile,
  listingsContainer,
  append = false,
  newListing = null,
) {
  if (!append) {
    listingsContainer.innerHTML = ""
  }

  if (newListing !== null) {
    const newListingCard = createListingCard(newListing, getProfile)
    listingsContainer.appendChild(newListingCard)
  }

  if (append) {
    console.log("Appending all listings...")
    listings.forEach((listing) => {
      const card = createListingCard(listing, getProfile)
      listingsContainer.appendChild(card)
      console.log("Listing appended:", card)
    })
  } else {
    listings.forEach((listing) => {
      const card = createListingCard(listing, getProfile)
      listingsContainer.appendChild(card)
    })
  }
}

function getLastBid(bids) {
  if (!bids || bids.length === 0) {
    return null
  }
  return bids[bids.length - 1]
}
