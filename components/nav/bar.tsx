"use client"

import Link from "next/link"
import { Avatars } from "appwrite"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu"
import { Button } from "../ui/button"
import { ThemeToggler } from "../theme-toggler"
import { NavDrawer } from "./drawer"
import { useCurrentUser } from "@/hooks/use-current-user"
import { UserMenu } from "../avatar-menu"

const navLinks = [
  { name: "Articles", path: "/articles" },
  { name: "Miscellaneous", path: "/miscellaneous" },
  { name: "About", path: "/about" },
]

export function NavBar() {
  const { user, loading } = useCurrentUser()

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex w-1/4">
          <Link
            href="/"
            className="text-lg font-semibold transition hover:text-primary"
          >
            PlaceHolder
          </Link>
        </div>

        <NavigationMenu className="hidden w-2/4 flex-1 justify-center md:flex">
          <NavigationMenuList className="flex gap-1">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.path}>
                <NavigationMenuLink href={link.path}>
                  {link.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden w-1/4 items-center justify-end gap-2 md:flex">
          <ThemeToggler />

          {loading ? null : user ? (
            <UserMenu user={user} />
          ) : (
            <Button asChild size="sm">
              <Link href="/auth">Start Writing</Link>
            </Button>
          )}
        </div>

        <NavDrawer links={navLinks} />
      </div>
    </header>
  )
}
