"use client"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { account } from "@/lib/appwrite"
import type { Models } from "appwrite"

export function useCurrentUser() {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    account
      .get()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [pathname])

  return { user, loading }
}
