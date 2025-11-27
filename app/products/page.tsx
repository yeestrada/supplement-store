"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { products, categories } from "@/lib/data"
import { ProductImage } from "@/components/ProductImage"
import Link from "next/link"

type SortOption = "price-asc" | "price-desc" | "name-asc" | "name-desc" | "bestseller"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<string>("all")
  const [showBestSellers, setShowBestSellers] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>("name-asc")

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number)
      if (max) {
        filtered = filtered.filter((p) => p.price >= min && p.price <= max)
      } else {
        filtered = filtered.filter((p) => p.price >= min)
      }
    }

    if (showBestSellers) {
      filtered = filtered.filter((p) => p.isBestSeller)
    }

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "bestseller":
        filtered.sort((a, b) => {
          if (a.isBestSeller && !b.isBestSeller) return -1
          if (!a.isBestSeller && b.isBestSeller) return 1
          return 0
        })
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, priceRange, showBestSellers, sortBy])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="mb-8 text-4xl font-bold">All Products</h1>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger>
              <SelectValue placeholder="Price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All prices</SelectItem>
              <SelectItem value="0-20">$0 - $20</SelectItem>
              <SelectItem value="20-30">$20 - $30</SelectItem>
              <SelectItem value="30-40">$30 - $40</SelectItem>
              <SelectItem value="40-50">$40 - $50</SelectItem>
              <SelectItem value="50-999">$50+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-8 flex flex-wrap gap-4">
          <Button
            variant={showBestSellers ? "default" : "outline"}
            onClick={() => setShowBestSellers(!showBestSellers)}
          >
            {showBestSellers ? "✓" : ""} Best Sellers
          </Button>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name: A-Z</SelectItem>
              <SelectItem value="name-desc">Name: Z-A</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="bestseller">Best Sellers First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedProducts.map((product) => (
            <Card key={product.id} className="flex flex-col overflow-hidden">
              <div className="relative aspect-square w-full">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.isBestSeller && (
                  <div className="absolute top-2 right-2 rounded bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">
                    Best Seller
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                  {product.description}
                </p>
                <p className="text-2xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Link href={`/products/${product.id}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No products found with the selected filters.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

