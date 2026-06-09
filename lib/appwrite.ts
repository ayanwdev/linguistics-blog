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
    const instance = new Account(getClient())
    const value = instance[prop as keyof Account]
    return typeof value === "function" ? value.bind(instance) : value
  },
})

export const avatars = new Proxy({} as Avatars, {
  get(_, prop) {
    const instance = new Avatars(getClient())
    const value = instance[prop as keyof Avatars]
    return typeof value === "function" ? value.bind(instance) : value
  },
})

export { getClient as client }
