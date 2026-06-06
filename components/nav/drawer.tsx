"use client"

import * as React from "react"
import Link from "next/link"
import { MenuIcon, ChevronUp, LogOut } from "lucide-react"

import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "../ui/sheet"
import { ThemeToggler } from "../theme-toggler"
import { Avatar, AvatarImage } from "../ui/avatar"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../ui/collapsible"

import { useCurrentUser } from "@/hooks/use-current-user"
import { client, account } from "@/lib/appwrite"
import { Avatars } from "appwrite"
import { avatarMenuItems } from "../avatar-menu"

type Props = {
  links: {
    name: string
    path: string
  }[]
}

export function NavDrawer({ links }: Props) {
  const avatars = new Avatars(client())
  const [isOpen, setIsOpen] = React.useState(false)
  const [userOpen, setUserOpen] = React.useState(false)
  const { user, loading } = useCurrentUser()
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
    <div className="flex items-center gap-2 md:hidden">
      <ThemeToggler />
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" aria-label="Open menu">
            <MenuIcon className="h-4.5 w-4.5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="flex flex-col px-6 py-8"
        >
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <SheetClose key={link.path} asChild>
                <Link
                  href={link.path}
                  className="text-base font-medium transition hover:text-primary"
                >
                  {link.name}
                </Link>
              </SheetClose>
            ))}
          </nav>
          <div className="mt-auto">
            {loading ? null : user ? (
              <Collapsible open={userOpen} onOpenChange={setUserOpen}>
                <div className="relative">
                  <CollapsibleTrigger asChild>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-md px-2 py-2 hover:bg-muted"
                      aria-label="Open user options"
                      onClick={() => setUserOpen((s) => !s)}
                    >
                      <Avatar size="default">
                        <AvatarImage
                          src={avatars.getInitials({
                            name: user.name,
                            width: 160,
                            height: 160,
                          })}
                          alt={`${user.name} avatar`}
                        />
                      </Avatar>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          @{(user.name || "").toLowerCase().replace(/\s+/g, "")}
                        </div>
                      </div>
                      <ChevronUp
                        className={`h-4 w-4 transition-transform ${userOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="absolute bottom-full z-50 mb-2 w-full bg-muted py-2">
                    <div className="flex flex-col gap-1">
                      {avatarMenuItems.map(({ label, href, icon: Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          className="ml-2 flex items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-muted"
                        >
                          <Icon className="h-4 w-4" />
                          {label}
                        </Link>
                      ))}
                      <button
                        onClick={handleSignOut}
                        className="ml-2 flex items-center gap-3 rounded-md px-2 py-2 text-sm text-destructive hover:bg-muted"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ) : (
              <SheetClose asChild>
                <Button asChild size="sm" className="w-full">
                  <Link href="/auth">{"Start Writing"}</Link>
                </Button>
              </SheetClose>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
