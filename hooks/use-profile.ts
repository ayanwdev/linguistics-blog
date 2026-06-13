"use client"
import { useEffect, useState } from "react"
import { TablesDB, AppwriteException, Avatars } from "appwrite"
import { client } from "@/lib/appwrite"
import { useCurrentUser } from "./use-current-user"

export type Profile = {
  $id: string
  name: string
  about: string
  institution: string
  $sequence?: string
  $createdAt?: string
  $updatedAt?: string
}

export function useProfile() {
  const { user } = useCurrentUser()
  const [data, setData] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    const tables = new TablesDB(client())
    tables
      .getRow({
        databaseId: process.env.NEXT_PUBLIC_APPWRITE_PROFILES_DB!,
        tableId: "profiles",
        rowId: user.$id,
      })
      .then((row) =>
        setData({
          $id: row.$id,
          name: row.name,
          about: row.about,
          institution: row.institution,
          $sequence: row.$sequence,
          $createdAt: row.$createdAt,
          $updatedAt: row.$updatedAt,
        }),
      )
      .catch((err) =>
        setError(
          err instanceof AppwriteException
            ? err.message
            : "Failed to fetch profile",
        ),
      )
      .finally(() => setLoading(false))
  }, [user])

  const updateProfile = async (p: Profile) => {
    const { $id, $createdAt, $updatedAt, $sequence, ...fields } = p
    const tables = new TablesDB(client())
    const updated = await tables
      .updateRow({
        databaseId: process.env.NEXT_PUBLIC_APPWRITE_PROFILES_DB!,
        tableId: "profiles",
        rowId: $id,
        data: fields,
      })
      .catch((err) => {
        console.error("Failed to update profile:", err)
        return null
      })
    if (updated)
      setData({
        $id: updated.$id,
        name: updated.name,
        about: updated.about,
        institution: updated.institution,
        $sequence: updated.$sequence,
        $createdAt: updated.$createdAt,
        $updatedAt: updated.$updatedAt,
      })
    return updated
  }

  const getAvatar = (size?: number) => {
    const avatars = new Avatars(client())
    const avatarSize = size || 160
    const avatar = avatars.getInitials({
      name: data?.name,
      height: avatarSize,
      width: avatarSize,
    })

    return avatar
  }

  return { data, loading, error, updateProfile, getAvatar }
}
