"use client"

import { useParams } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/data"
import { ProductImage } from "@/components/ProductImage"
import { useCartStore } from "@/lib/store"
import { useRouter } from "next/navigation"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const product = products.find((p) => p.id === params.id)
  const addItem = useCartStore((state) => state.addItem)

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container py-12 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Button className="mt-4" onClick={() => router.push("/products")}>
            Back to Products
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product)
    router.push("/cart")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-2xl border-2 border-border">
            <ProductImage
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <div>
              {product.isBestSeller && (
                <span className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-lg mb-4">
                  ⭐ Best Seller
                </span>
              )}
            </div>
            <h1 className="text-5xl font-bold leading-tight">{product.name}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>
            <div className="flex items-baseline gap-3 py-4 border-y">
              <span className="text-5xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Category:</strong> {product.category}
              </p>
            </div>
            <Button 
              size="lg" 
              onClick={handleAddToCart} 
              className="w-full md:w-auto text-lg h-12 px-8 hover:scale-105 transition-transform"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

