"use client"

import * as React from "react"
import Link from "next/link"
import { MenuIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet"
import { ThemeToggler } from "./theme-toggler"

export const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold transition hover:text-primary"
        >
          {"PlaceHolder"}
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden flex-1 justify-center md:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuLink href="/articles">Articles</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/about">About</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Right Section */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggler />

          <Button asChild size="sm">
            <Link href="/auth">Start Writing</Link>
          </Button>
        </div>

        {/* Mobile Right Section */}
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
              {/* Links at Top */}
              <nav className="flex flex-col gap-4">
                <SheetClose asChild>
                  <Link
                    href="/articles"
                    className="text-base font-medium transition hover:text-primary"
                  >
                    Articles
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/about"
                    className="text-base font-medium transition hover:text-primary"
                  >
                    About
                  </Link>
                </SheetClose>
              </nav>

              {/* Start Writing Button at Bottom */}
              <div className="mt-auto">
                <SheetClose asChild>
                  <Button asChild size="sm" className="w-full">
                    <Link href="/auth">Start Writing</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
