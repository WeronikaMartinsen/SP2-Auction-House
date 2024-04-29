import { API_BASE_URL, API_KEY } from "../constants.js"
import { load } from "../storage/storeToken.js"

export async function getApiKey() {
  const response = await fetch(API_BASE_URL + API_KEY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${load("token")}`,
    },
    body: JSON.stringify({
      name: "Test",
    }),
  })

  if (response.ok) {
    return await response.json()
  }

  console.error(await response.json)
  throw new Error("Could not register for an API key!")
}
