"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function Header() {
  const itemCount = useCartStore((state) => state.getItemCount())
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-l from-primary/20 via-primary/10 to-white backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center space-x-2 group min-w-0 flex-shrink-0">
          <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
            <Store className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent whitespace-nowrap hidden sm:inline">
            Supplement Store
          </span>
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent whitespace-nowrap sm:hidden">
            Store
          </span>
        </Link>
        <nav className="flex items-center space-x-2 sm:space-x-6 flex-shrink-0">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-all relative group whitespace-nowrap",
              isActive("/")
                ? "text-primary font-semibold"
                : "hover:text-primary"
            )}
          >
            Home
            <span className={cn(
              "absolute bottom-0 left-0 h-0.5 bg-primary transition-all",
              isActive("/") ? "w-full" : "w-0 group-hover:w-full"
            )}></span>
          </Link>
          <Link
            href="/products"
            className={cn(
              "text-sm font-medium transition-all relative group whitespace-nowrap",
              isActive("/products")
                ? "text-primary font-semibold"
                : "hover:text-primary"
            )}
          >
            Products
            <span className={cn(
              "absolute bottom-0 left-0 h-0.5 bg-primary transition-all",
              isActive("/products") ? "w-full" : "w-0 group-hover:w-full"
            )}></span>
          </Link>
          <Link href="/cart" className="flex-shrink-0">
            <Button 
              variant={isActive("/cart") ? "default" : "outline"} 
              size="icon" 
              className={cn(
                "relative transition-all",
                isActive("/cart") 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-primary/10"
              )}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-lg animate-in zoom-in duration-200">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

