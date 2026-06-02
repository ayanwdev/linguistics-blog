"use client"

import { useCurrentUser } from "@/hooks/use-current-user"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { client } from "@/lib/appwrite"
import { Avatars } from "appwrite"

const avatars = new Avatars(client)

export default function ProfilePage() {
  const { user, loading } = useCurrentUser()

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-950">
        <h1 className="mb-6 text-2xl font-bold">Profile</h1>

        {loading && (
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Name
              </p>
              <Skeleton className="h-6 w-full" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Email
              </p>
              <Skeleton className="h-6 w-full" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                User ID
              </p>
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        )}

        {user && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm dark:bg-gray-800">
                <img
                  src={avatars.getInitials({
                    name: user.name,
                    width: 160,
                    height: 160,
                  })}
                  alt={`${user.name} avatar`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Signed in as
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {"@" + user.$id}
                </p>
              </div>
            </div>

            <Button variant="outline" className="mt-4 w-full">
              Edit Profile
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
