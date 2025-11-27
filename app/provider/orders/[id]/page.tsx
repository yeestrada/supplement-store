"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useOrderStore } from "@/lib/store"
import { dummyOrders } from "@/lib/data"
import { Order } from "@/lib/types"
import { ProductImage } from "@/components/ProductImage"
import { useEffect, useState } from "react"

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const orders = useOrderStore((state) => state.orders)
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus)
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    const allOrders = [...orders, ...dummyOrders]
    const foundOrder = allOrders.find((o) => o.id === params.id)
    setOrder(foundOrder || null)
  }, [params.id, orders])

  if (!order) {
    return (
      <main className="flex-1 container py-12 text-center">
        <h1 className="text-2xl font-bold">Order not found</h1>
        <Button className="mt-4" onClick={() => router.push("/provider/orders")}>
          Back to Orders
        </Button>
      </main>
    )
  }

  const handleStatusChange = (newStatus: Order["status"]) => {
    updateOrderStatus(order.id, newStatus)
    setOrder({ ...order, status: newStatus })
  }

  const getStatusColor = (status: Order["status"]) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    }
    return colors[status]
  }

  const getStatusLabel = (status: Order["status"]) => {
    const labels = {
      pending: "Pending",
      processing: "Processing",
      shipped: "Shipped",
      delivered: "Delivered",
      cancelled: "Cancelled",
    }
    return labels[status]
  }

  return (
    <main className="flex-1 container py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Order Details</h1>
            <p className="text-muted-foreground">Order ID: <span className="font-mono font-semibold">{order.id}</span></p>
          </div>
          <Button variant="outline" onClick={() => router.push("/provider/orders")} className="hover:bg-primary hover:text-primary-foreground transition-all">
            ← Back to Orders
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Order ID
                    </p>
                    <p className="text-lg font-semibold font-mono">{order.id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Date
                    </p>
                    <p className="text-lg">
                      {new Date(order.createdAt).toLocaleString("en-US")}
                    </p>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Status
                    </p>
                    <span
                      className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold shadow-sm ${getStatusColor(order.status)}`}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold">Product</TableHead>
                        <TableHead className="font-semibold">Quantity</TableHead>
                        <TableHead className="font-semibold">Price</TableHead>
                        <TableHead className="font-semibold">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.items.map((item) => (
                        <TableRow key={item.product.id} className="hover:bg-muted/30 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-4">
                              <div className="relative h-16 w-16 overflow-hidden rounded-lg border-2 border-border">
                                <ProductImage
                                  src={item.product.image}
                                  alt={item.product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{item.product.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {item.product.category}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{item.quantity}</TableCell>
                          <TableCell>${item.product.price.toFixed(2)}</TableCell>
                          <TableCell className="font-semibold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-6 flex justify-end border-t pt-6">
                  <div className="text-right space-y-1">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-3xl font-bold text-primary">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Name
                  </p>
                  <p className="font-semibold text-lg">{order.customerName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <p className="break-all">{order.customerEmail}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Phone
                  </p>
                  <p>{order.customerPhone}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">{order.shippingAddress}</p>
                <p className="text-muted-foreground">
                  {order.shippingCity}, {order.shippingZipCode}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md border-2 border-primary/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Change Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={order.status}
                  onValueChange={(v) => handleStatusChange(v as Order["status"])}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
  )
}

