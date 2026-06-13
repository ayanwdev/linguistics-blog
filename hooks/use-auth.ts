"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AppwriteException, ID, TablesDB } from "appwrite"
import { signUp, login } from "@/lib/auth"
import { account, client } from "@/lib/appwrite"

const generateUsername = (name: string) =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9_-]/g, "")

export function useAuth() {
  const router = useRouter()
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  })
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [usernameManuallySet, setUsernameManuallySet] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)

  useEffect(() => {
    account
      .getSession({ sessionId: "current" })
      .then((s) => setSessionId(s.$id))
      .catch(() => setSessionId(null))
  }, [])

  const setSignUpField =
    (field: keyof typeof signUpData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setSignUpData((prev) => ({
        ...prev,
        [field]: value,
        ...(field === "fullName" &&
          !usernameManuallySet && { username: generateUsername(value) }),
      }))
    }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUsernameManuallySet(value !== "")
    setSignUpData((prev) => ({ ...prev, username: value }))
  }

  const setLoginField =
    (field: keyof typeof loginData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setLoginData((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSignUp = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const created = await signUp({
        fullName: signUpData.fullName,
        username: signUpData.username || ID.unique(),
        email: signUpData.email,
        password: signUpData.password,
      })

      try {
        const tables = new TablesDB(client())
        await tables.createRow({
          databaseId: process.env.NEXT_PUBLIC_APPWRITE_PROFILES_DB!,
          tableId: "profiles",
          rowId: created.$id,
          data: {
            name: created.name,
            institution: "",
            about: "",
          },
        })
      } catch (profileErr) {
        console.error("Failed to create profile", profileErr)
      }

      setSignUpData({ fullName: "", username: "", email: "", password: "" })
      router.push("/profile")
    } catch (err) {
      setError(
        err instanceof AppwriteException ? err.message : "Sign up failed",
      )
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(loginData.email, loginData.password)
      router.push("/profile")
    } catch (err) {
      setError(err instanceof AppwriteException ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const deleteSession = async () => {
    try {
      await account.deleteSession({ sessionId: "current" })
      setSessionId(null)
    } catch (err) {
      console.error("Failed to delete session", err)
    }
  }

  return {
    signUpData,
    loginData,
    loading,
    error,
    sessionId,
    setSignUpField,
    handleUsernameChange,
    setLoginField,
    handleSignUp,
    handleLogin,
    deleteSession,
  }
}
