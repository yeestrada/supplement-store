"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"
import { ProductImage } from "@/components/ProductImage"
import Link from "next/link"
import { Trash2 } from "lucide-react"

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart)
  const total = useCartStore((state) => state.getTotal())

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold">Your cart is empty</h1>
            <p className="mb-8 text-muted-foreground">
              Add some products to get started.
            </p>
            <Link href="/products">
              <Button>View Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <h1 className="mb-8 text-4xl font-bold">Shopping Cart</h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.product.id}>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                    <ProductImage
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.product.category}
                    </p>
                    <p className="mt-2 font-bold text-primary">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Link href="/checkout" className="block">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

