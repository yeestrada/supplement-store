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
          <div className="relative aspect-square w-full overflow-hidden rounded-lg">
            <ProductImage
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="mb-4">
              {product.isBestSeller && (
                <span className="inline-block rounded bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
                  Best Seller
                </span>
              )}
            </div>
            <h1 className="mb-4 text-4xl font-bold">{product.name}</h1>
            <p className="mb-4 text-lg text-muted-foreground">
              {product.description}
            </p>
            <div className="mb-6">
              <span className="text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                <strong>Category:</strong> {product.category}
              </p>
            </div>
            <Button size="lg" onClick={handleAddToCart} className="w-full md:w-auto">
              Add to Cart
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

