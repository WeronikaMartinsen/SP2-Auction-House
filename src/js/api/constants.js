export const API_BASE_URL = "https://api.noroff.dev/api/v1/auction"
export const REGISTER = "/auth/register"
export const LOGIN = "/auth/login"
export const LISTINGS = "/listings"
export const SINGLE_LISTING = "/listings/${listingId}"
export const PROFILES = "/profiles"
export const PLACE_BID = "/listings/${listingId}/bids"

const queryString = document.location.search

const params = new URLSearchParams(queryString)

export const id = params.get("id")

export const sellerName = params.get("sellerName")
