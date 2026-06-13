import { Client, Account, Avatars, TablesDB, AppwriteException } from "appwrite"

let _client: Client | null = null

export function client() {
  if (_client) return _client
  _client = new Client()

  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID

  if (endpoint && typeof endpoint === "string") {
    _client.setEndpoint(endpoint)
  }

  if (projectId && typeof projectId === "string") {
    _client.setProject(projectId)
  }

  return _client
}

export const account = new Proxy({} as Account, {
  get(_, prop) {
    const instance = new Account(client())
    const value = instance[prop as keyof Account]
    return typeof value === "function" ? value.bind(instance) : value
  },
})

export const avatars = new Proxy({} as Avatars, {
  get(_, prop) {
    const instance = new Avatars(client())
    const value = instance[prop as keyof Avatars]
    return typeof value === "function" ? value.bind(instance) : value
  },
})
