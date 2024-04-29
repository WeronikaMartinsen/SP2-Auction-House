const queryString = document.location.search

const params = new URLSearchParams(queryString)

export const id = params.get("id")

export const sellerName = params.get("sellerName")

export const API_BASE_URL = "https://v2.api.noroff.dev"
export const API_KEY = "/auth/create-api-key"
export const API_KEY_NAME = "c5e37531-1eab-4377-baf7-bd1845e1674f"
export const REGISTER = "/auth/register"
export const LOGIN = "/auth/login"
export const LISTINGS = "/auction/listings"
export const LISTING = "/auction/listings/" + id
export const PROFILES = "/auction/profiles"
export const PLACE_BID = "/listings/id"
