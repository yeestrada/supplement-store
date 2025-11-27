"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package, Home } from "lucide-react"

export function ProviderHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/provider/orders" className="flex items-center space-x-2">
          <Package className="h-5 w-5" />
          <span className="text-xl font-bold">Provider Portal</span>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link
            href="/provider/orders"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Orders
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm">
              <Home className="h-4 w-4 mr-2" />
              Go to Storefront
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

