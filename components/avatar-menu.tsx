"use client"
import Link from "next/link"
import { Avatars } from "appwrite"
import { LogOut, PlusSquare, Settings2, User, LucideIcon } from "lucide-react"
import { Avatar, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu"
import { client, account } from "@/lib/appwrite"
import type { Models } from "appwrite"

const avatars = new Avatars(client)

const menuItems: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "View Profile", href: "/profile", icon: User },
  { label: "Manage Account", href: "/account", icon: Settings2 },
  { label: "Submit Article", href: "/new", icon: PlusSquare },
]

export function UserMenu({ user }: { user: Models.User<Models.Preferences> }) {
  const handleSignOut = async () => {
    try {
      await account.deleteSession({ sessionId: "current" })
    } catch (error) {
      console.error("Failed to sign out", error)
    } finally {
      window.location.href = "/"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-sm transition hover:bg-muted"
          aria-label="Open user menu"
        >
          <Avatar>
            <AvatarImage
              src={avatars.getInitials({
                name: user.name,
                width: 160,
                height: 160,
              })}
              alt={`${user.name} avatar`}
            />
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {menuItems.map(({ label, href, icon: Icon }) => (
          <DropdownMenuItem key={href} asChild>
            <Link
              href={href}
              className="flex w-full cursor-pointer items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={handleSignOut}
          className="cursor-pointer text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
