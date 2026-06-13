"use client"

import { Badge } from "@/components/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { useProfile } from "@/hooks/use-profile"
import {
  AtSign,
  AtSignIcon,
  InfoIcon,
  PaperclipIcon,
  School,
} from "lucide-react"

export default function ProfilePage() {
  const { data: profile, loading, getAvatar } = useProfile()

  if (loading) {
    return (
      <section>
        <div className="flex flex-row p-6">
          <Skeleton className="h-36 w-36 rounded-full" />
          <div className="ml-6 flex items-center">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="mt-2 h-4 w-32" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="flex flex-row border-b-2 border-dashed border-accent p-6">
        <Avatar className="h-36 w-36">
          <AvatarImage src={getAvatar()} alt={`${profile?.name} avatar`} />
        </Avatar>

        <div className="ml-6 flex">
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold">{profile?.name}</h1>
            {/* --- */}
            <div className="mt-2 flex items-center">
              <AtSignIcon size={17} className="text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">
                {profile?.$id}
              </span>
              <div className="ml-2">
                <Badge name="dev" />
              </div>
            </div>
            {/* --- */}
            <div className="mt-2 flex items-center">
              <PaperclipIcon size={17} className="text-muted-foreground" />
              <span className={"ml-2 text-sm text-muted-foreground"}>
                {"BA Linguistics, NLP + ML Enthusiast"}
              </span>
            </div>
            {/* --- */}
            <div className="mt-2 flex items-center">
              <School size={17} className="text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">
                {"University of Dhaka"}
              </span>
            </div>
            {/* --- */}
          </div>
        </div>
      </div>

      <div className="pt-12">
        <h1 className="text-2xl font-semibold">{"Articles (0)"}</h1>
      </div>
    </section>
  )
}
