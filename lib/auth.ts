import { Account, Client } from "appwrite"

const getAccount = () => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  return new Account(client)
}

export async function signUp(data: {
  fullName: string
  username: string
  email: string
  password: string
}) {
  const account = getAccount()
  const created = await account.create({
    userId: data.username,
    email: data.email,
    name: data.fullName,
    password: data.password,
  })
  await account.createEmailPasswordSession({
    email: data.email,
    password: data.password,
  })
  return created
}

export async function login(email: string, password: string) {
  const account = getAccount()
  return await account.createEmailPasswordSession({ email, password })
}

export async function deleteSession() {
  const account = getAccount()
  await account.deleteSession({ sessionId: "current" })
  window.location.reload()
  return await account.deleteSession({ sessionId: "current" })
}
