"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCartStore, useOrderStore } from "@/lib/store"
import { ProductImage } from "@/components/ProductImage"

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((state) => state.items)
  const total = useCartStore((state) => state.getTotal())
  const clearCart = useCartStore((state) => state.clearCart)
  const addOrder = useOrderStore((state) => state.addOrder)

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
    shippingCity: "",
    shippingZipCode: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.customerName.trim()) newErrors.customerName = "Required"
    if (!formData.customerEmail.trim()) newErrors.customerEmail = "Required"
    if (!formData.customerPhone.trim()) newErrors.customerPhone = "Required"
    if (!formData.shippingAddress.trim()) newErrors.shippingAddress = "Required"
    if (!formData.shippingCity.trim()) newErrors.shippingCity = "Required"
    if (!formData.shippingZipCode.trim()) newErrors.shippingZipCode = "Required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const order = {
      id: `ORD-${Date.now()}`,
      ...formData,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
      items: items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      })),
      total,
    }

    addOrder(order)
    clearCart()
    router.push(`/provider/orders/${order.id}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <h1 className="mb-8 text-4xl font-bold">Checkout</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="customerName">Full Name *</Label>
                    <Input
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                    />
                    {errors.customerName && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.customerName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">Email *</Label>
                    <Input
                      id="customerEmail"
                      name="customerEmail"
                      type="email"
                      value={formData.customerEmail}
                      onChange={handleChange}
                      required
                    />
                    {errors.customerEmail && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.customerEmail}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">Phone *</Label>
                    <Input
                      id="customerPhone"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleChange}
                      required
                    />
                    {errors.customerPhone && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.customerPhone}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="shippingAddress">Address *</Label>
                    <Input
                      id="shippingAddress"
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleChange}
                      required
                    />
                    {errors.shippingAddress && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.shippingAddress}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shippingCity">City *</Label>
                      <Input
                        id="shippingCity"
                        name="shippingCity"
                        value={formData.shippingCity}
                        onChange={handleChange}
                        required
                      />
                      {errors.shippingCity && (
                        <p className="mt-1 text-sm text-destructive">
                          {errors.shippingCity}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="shippingZipCode">Zip Code *</Label>
                      <Input
                        id="shippingZipCode"
                        name="shippingZipCode"
                        value={formData.shippingZipCode}
                        onChange={handleChange}
                        required
                      />
                      {errors.shippingZipCode && (
                        <p className="mt-1 text-sm text-destructive">
                          {errors.shippingZipCode}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border">
                          <ProductImage
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-2">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            ${item.product.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Confirm Order
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}

