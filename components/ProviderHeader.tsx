"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Package, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export function ProviderHeader() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-l from-primary/20 via-primary/10 to-white backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/provider/orders" className="flex items-center space-x-2 group min-w-0 flex-shrink-0">
          <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent whitespace-nowrap hidden sm:inline">
            Provider Portal
          </span>
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent whitespace-nowrap sm:hidden">
            Portal
          </span>
        </Link>
        <nav className="flex items-center space-x-2 sm:space-x-6 flex-shrink-0">
          <Link
            href="/provider/orders"
            className={cn(
              "text-sm font-medium transition-all relative group whitespace-nowrap",
              isActive("/provider/orders")
                ? "text-primary font-semibold"
                : "hover:text-primary"
            )}
          >
            Orders
            <span className={cn(
              "absolute bottom-0 left-0 h-0.5 bg-primary transition-all",
              isActive("/provider/orders") ? "w-full" : "w-0 group-hover:w-full"
            )}></span>
          </Link>
          <Link href="/">
            <Button 
              variant="outline" 
              size="sm" 
              className="hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Home className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Go to Storefront</span>
              <span className="sm:hidden">Store</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

