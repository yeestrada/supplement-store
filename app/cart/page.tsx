"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"
import { ProductImage } from "@/components/ProductImage"
import Link from "next/link"
import { Trash2, ShoppingCart } from "lucide-react"

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
          <div className="text-center py-16">
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="mb-4 text-3xl font-bold">Your cart is empty</h1>
            <p className="mb-8 text-muted-foreground text-lg">
              Add some products to get started.
            </p>
            <Link href="/products">
              <Button size="lg">Browse Products</Button>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">Review your items before checkout</p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.product.id} className="hover:shadow-md transition-shadow">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 border-border">
                    <ProductImage
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.product.category}
                    </p>
                    <p className="text-xl font-bold text-primary">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.product.id)}
                    className="hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Button 
              variant="outline" 
              onClick={clearCart}
              className="w-full hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-all"
            >
              Clear Cart
            </Button>
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
                <Link href="/checkout" className="block mt-6">
                  <Button className="w-full" size="lg" variant="default">
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

