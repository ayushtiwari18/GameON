"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function NavBar() {
  const pathname = usePathname()

  return (
    <header className="w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gray-200" />
          <span className="text-xl font-bold">GAME ON</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground",
            )}
          >
            HOME
          </Link>
          <Link
            href="/about"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/about" ? "text-primary" : "text-muted-foreground",
            )}
          >
            About Us
          </Link>
          <Link
            href="/content"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/content" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Content
          </Link>
          <Link
            href="/gallery"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/gallery" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Gallery
          </Link>
          <Link
            href="/faqs"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/faqs" ? "text-primary" : "text-muted-foreground",
            )}
          >
            FAQs
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost">Sign in</Button>
          </Link>
          <Link href="/register">
            <Button>Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

