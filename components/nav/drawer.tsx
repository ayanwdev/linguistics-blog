"use client"

import * as React from "react"
import Link from "next/link"
import { MenuIcon } from "lucide-react"

import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "../ui/sheet"
import { ThemeToggler } from "../theme-toggler"

import { useCurrentUser } from "@/hooks/use-current-user"
import { UserMenu } from "../avatar-menu"
import type { Models } from "appwrite"

type Props = {
  links: {
    name: string
    path: string
  }[]
}

export function NavDrawer({ links }: Props) {
  const [isOpen, setIsOpen] = React.useState(false)
  const { user, loading } = useCurrentUser()

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
              <UserMenu user={user} />
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
