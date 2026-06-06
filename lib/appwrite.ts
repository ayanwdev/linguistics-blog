import { Client, Account, Avatars } from "appwrite"

let client: Client | null = null

function getClient() {
  if (client) return client
  client = new Client()

  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID

  if (endpoint && typeof endpoint === "string") {
    client.setEndpoint(endpoint)
  }

  if (projectId && typeof projectId === "string") {
    client.setProject(projectId)
  }

  return client
}

export const account = new Proxy({} as Account, {
  get(_, prop) {
    return (new Account(getClient()) as any)[prop]
  },
})

export const avatars = new Proxy({} as Avatars, {
  get(_, prop) {
    return (new Avatars(getClient()) as any)[prop]
  },
})

export { getClient as client }
