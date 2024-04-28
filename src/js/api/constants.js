const queryString = document.location.search

const params = new URLSearchParams(queryString)

export const id = params.get("id")

export const sellerName = params.get("sellerName")

export const API_BASE_URL = "https://v2.api.noroff.dev"
export const API_KEY = "/auth/create-api-key"
export const REGISTER = "/auth/register"
export const LOGIN = "/auth/login"
export const LISTINGS = "/listings"
export const LISTING = "/listings/" + id
export const PROFILES = "/profiles"
export const PLACE_BID = "/listings/id"
