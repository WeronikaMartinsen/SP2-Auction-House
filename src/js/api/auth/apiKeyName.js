import { createAPIKey } from "./apiKey.js"

async function main() {
  try {
    const apiKeyData = {
      name: "be4ab55c-d5b0-44c3-8a11-67a7dafddd10",
    }
    const apiKey = await createAPIKey(apiKeyData)
    console.log("Newly created API key:", apiKey)
  } catch (error) {
    console.error("Failed to create API key:", error)
  }
}

main()
